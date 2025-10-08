// import { useCallback } from 'react';
// import { toast } from 'react-toastify';
// import { getCreateVaultTransaction, postDepositToVault } from 'src/lib/api';
// import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';

// export type UseCreateVaultOptions = {
//     waitForReceipt?: boolean;
//     onCompletedAll?: (...args: [string[]]) => void;
//     onError?: (...args: [unknown]) => void;
//     // If provided, will trigger add-strategy flow after vault creation
//     vaultAddress?: string;
//     // Optional performance fee for strategy add; defaults to management_fee
//     strategyPerformanceFeePct?: number;
// };

// export default function useCreateVault(options?: UseCreateVaultOptions) {
//     const { address } = useSummaryAptosConnect();

//     type MinimalWriteParams = {
//         address: `0x${string}`;
//         abi: Abi;
//         functionName: string;
//         args?: readonly unknown[];
//     };

//     // ------------------------------------
//     // Helpers for extracting vault address
//     // ------------------------------------
//     const isHexAddress = (value: unknown): value is `0x${string}` => typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);

//     const verifyIsDeployedContract = useCallback(
//         async (candidate?: string): Promise<boolean> => {
//             if (!candidate || !publicClient) return false;
//             try {
//                 const bytecode = await publicClient.getBytecode({ address: candidate as `0x${string}` });
//                 return !!bytecode && bytecode !== '0x';
//             } catch {
//                 return false;
//             }
//         },
//         [publicClient]
//     );

//     const extractNewVaultAddressFromReceipt = useCallback(
//         async (receipt: any, factoryAddress: string): Promise<string | null> => {
//             if (!receipt?.logs?.length) return null;

//             // Only consider logs emitted by the factory first
//             const factoryLogs = receipt.logs.filter((log: any) => isHexAddress(log?.address) && log.address.toLowerCase() === factoryAddress.toLowerCase());

//             const scanForAddress = async (logs: any[]): Promise<string | null> => {
//                 for (const log of logs) {
//                     // 1) scan topics for an indexed address
//                     if (Array.isArray(log.topics)) {
//                         for (let j = 1; j < log.topics.length; j++) {
//                             const topic = log.topics[j];
//                             if (typeof topic === 'string' && topic.length === 66) {
//                                 const candidate = `0x${topic.slice(-40)}`;
//                                 if (isHexAddress(candidate) && candidate.toLowerCase() !== factoryAddress.toLowerCase() && (await verifyIsDeployedContract(candidate))) {
//                                     return candidate;
//                                 }
//                             }
//                         }
//                     }

//                     // 2) scan data blob for a 20-byte aligned address
//                     if (typeof log.data === 'string' && log.data.length > 2) {
//                         const data = log.data.slice(2);
//                         for (let k = 0; k <= data.length - 40; k += 2) {
//                             const candidate = `0x${data.slice(k, k + 40)}`;
//                             if (isHexAddress(candidate) && candidate.toLowerCase() !== factoryAddress.toLowerCase() && (await verifyIsDeployedContract(candidate))) {
//                                 return candidate;
//                             }
//                         }
//                     }
//                 }
//                 return null;
//             };

//             // Prefer addresses from factory logs
//             let found = await scanForAddress(factoryLogs);
//             if (found) return found;

//             // Fallback: scan all logs for a newly deployed contract address that is not the factory
//             found = await scanForAddress(receipt.logs);
//             if (found) return found;

//             // Last resort: some clients still populate contractAddress for direct CREATE
//             if (isHexAddress(receipt.contractAddress) && receipt.contractAddress.toLowerCase() !== factoryAddress.toLowerCase()) {
//                 return receipt.contractAddress;
//             }

//             return null;
//         },
//         [verifyIsDeployedContract]
//     );

//     const listTransactionFn = useCallback((rawListTransaction: ApiGetStepDataType[]): MinimalWriteParams[] => {
//         try {
//             if (!rawListTransaction) return [];
//             return rawListTransaction.map((step) => {
//                 const inputs = Array.isArray(step.inputs) ? step.inputs : [];

//                 const inferComponentType = (v: unknown): string => {
//                     if (typeof v === 'string' && /^0x[a-fA-F0-9]{40}$/.test(v)) return 'address';
//                     if (typeof v === 'string') return 'string';
//                     if (typeof v === 'number') return 'uint256';
//                     if (typeof v === 'bigint') return 'uint256';
//                     if (typeof v === 'boolean') return 'bool';
//                     return 'bytes';
//                 };

//                 const buildTupleComponents = (value: unknown): Array<{ name: string; type: string }> => {
//                     const valueArray = Array.isArray(value) ? (value as Array<unknown>) : [];
//                     return valueArray.map((v, idx) => ({
//                         name: `field_${idx}`,
//                         type: inferComponentType(v),
//                     }));
//                 };

//                 const abiInputs = inputs.map((input) => {
//                     if (typeof input.type === 'string' && input.type.startsWith('tuple')) {
//                         // Support tuple and tuple[] by inferring components from value(s)
//                         let components: Array<{ name: string; type: string }> = [];
//                         if (Array.isArray(input.value) && input.type.startsWith('tuple[')) {
//                             const first = (input.value as unknown[])[0];
//                             components = buildTupleComponents(first);
//                         } else {
//                             components = buildTupleComponents(input.value);
//                         }
//                         return {
//                             name: input.name,
//                             type: input.type,
//                             components,
//                         } as unknown as {
//                             name: string;
//                             type: string;
//                             components: Array<{ name: string; type: string }>;
//                         };
//                     }
//                     return {
//                         name: input.name,
//                         type: input.type,
//                     } as { name: string; type: string };
//                 });

//                 const coerceArgByType = (type: string, value: unknown): unknown => {
//                     if (typeof type === 'string' && type.startsWith('uint')) {
//                         if (typeof value === 'number') return BigInt(value);
//                         if (typeof value === 'string' && /^\d+$/.test(value)) return BigInt(value);
//                     }
//                     if (typeof type === 'string' && type.startsWith('tuple[')) {
//                         const arr = Array.isArray(value) ? (value as unknown[]) : [];
//                         return arr.map((tupleVal) => (Array.isArray(tupleVal) ? tupleVal.map((v) => (typeof v === 'number' ? BigInt(v) : v)) : tupleVal));
//                     }
//                     if (typeof type === 'string' && type.startsWith('tuple')) {
//                         const arr = Array.isArray(value) ? (value as unknown[]) : [];
//                         return arr.map((v) => (typeof v === 'number' ? BigInt(v) : v));
//                     }
//                     return value;
//                 };

//                 return {
//                     address: step.contract_address as `0x${string}`,
//                     abi: [
//                         {
//                             name: (step.function_name ?? '') as string,
//                             type: 'function',
//                             stateMutability: (step.state_mutability ?? 'nonpayable') as any,
//                             inputs: abiInputs as any,
//                             outputs: [],
//                         },
//                     ] as unknown as Abi,
//                     functionName: (step.function_name ?? '') as string,
//                     args: inputs.map((input) => {
//                         if (input.name === 'assets') return 0;
//                         return coerceArgByType(input.type, input.value as unknown);
//                     }) as readonly unknown[],
//                 };
//             });
//         } catch (error) {
//             toast.error('Error processing transaction steps.');
//             return [];
//         }
//     }, []);

//     const createVaultFn = useCallback(
//         async (
//             agentId: string,
//             vaultName: string,
//             vault_asset_address: string,
//             vault_share_token_name: string,
//             vault_share_token_symbol: string,
//             profit_max_unlock_time: number,
//             management_fee: number,
//             selectedProtocol: Array<DefillamaProtocolDataType>
//         ) => {
//             const { waitForReceipt = true, onCompletedAll } = options || {};
//             if (!address) {
//                 toast.error('Wallet not connected.');
//                 return;
//             }
//             try {
//                 const createVaultResponse = await getCreateVaultTransaction();

//                 const createVaultTxs = listTransactionFn(createVaultResponse.data.steps ?? []);

//                 if (!createVaultTxs?.length) {
//                     toast.info('No transactions to execute.');
//                     onCompletedAll?.([]);
//                     return;
//                 }

//                 await switchChainFn();
//                 const submittedHashes: string[] = [];

//                 let deployedVaultAddress: string | null = null;

//                 for (let i = 0; i < createVaultTxs.length; i++) {
//                     const tx = createVaultTxs[i];
//                     // Try to deterministically obtain vault address by simulating the first tx (if factory returns it)
//                     if (i === 0 && !deployedVaultAddress && publicClient) {
//                         try {
//                             const simulation = await publicClient.simulateContract({
//                                 address: tx.address,
//                                 abi: tx.abi,
//                                 functionName: tx.functionName as any,
//                                 args: (tx.args ?? []) as any,
//                                 account: address as `0x${string}`,
//                             } as any);

//                             const simResult = (simulation as any)?.result;
//                             if (typeof simResult === 'string' && /^0x[a-fA-F0-9]{40}$/.test(simResult)) {
//                                 deployedVaultAddress = simResult;
//                             }
//                         } catch (e) {
//                             console.log('Simulation did not return a vault address; will parse from logs.');
//                         }
//                     }

//                     // Replace placeholder addresses with the deployed vault address
//                     if (i > 0 && deployedVaultAddress && (tx.address as string) === 'VAULT_ADDRESS_FROM_STEP_1') {
//                         tx.address = deployedVaultAddress as `0x${string}`;
//                     }

//                     const hash = await writeContractAsync(tx);
//                     submittedHashes.push(hash);
//                     if (waitForReceipt && publicClient) {
//                         const receipt = await publicClient.waitForTransactionReceipt({ hash });
//                         // Extract vault address from the first transaction (createVault)
//                         if (i === 0) {
//                             try {
//                                 const foundAddress = await extractNewVaultAddressFromReceipt(receipt, tx.address as string);
//                                 if (foundAddress) {
//                                     deployedVaultAddress = foundAddress;
//                                 } else {
//                                     console.warn('Could not extract vault address from transaction logs or receipt');
//                                 }
//                             } catch (e) {
//                                 console.warn('Error extracting vault address from logs:', e);
//                             }
//                         }
//                     }
//                 }

//                 if (!deployedVaultAddress) {
//                     toast.error('Failed to determine deployed vault address.');
//                     return;
//                 }

//                 await apiPatchVaultData(createVaultResponse.data.vault_id, deployedVaultAddress, 'Ready');

//                 //0x62c071fda6ab84ce6edef8f2d11e43f9c1b919c1
//                 // const deployedVaultAddress = '0x77C1533A433FB626AdF6Ebedf8616e519520518d';

//                 // Optionally execute Add Strategy transactions for each selected protocol
//                 const vaultAddressToUse = deployedVaultAddress;
//                 const protocolsToAdd = Array.isArray(selectedProtocol) ? selectedProtocol.filter((p) => !!p?.protocol_address) : [];

//                 if (protocolsToAdd.length > 0 && vaultAddressToUse) {
//                     for (const protocol of protocolsToAdd) {
//                         try {
//                             const addStrategyResponse = await apiCreateAddStrategyStep(
//                                 address,
//                                 vaultAddressToUse,
//                                 protocol.protocol_address,
//                                 0, // Use 0% performance fee for now
//                                 management_fee,
//                                 1000000 // max_debt set to 0 for now
//                             );

//                             // const addStrategyResponse: ApiGetStepDataType[] = [
//                             //   {
//                             //     contract_address: vaultAddressToUse,
//                             //     function_name: 'addStrategy',
//                             //     state_mutability: 'nonpayable',
//                             //     description: 'Deposit assets into the vault',
//                             //     inputs: [
//                             //       {
//                             //         name: 'strategy',
//                             //         type: 'address',
//                             //         value: '0x9c6864105AEC23388C89600046213a44C384c831',
//                             //       },
//                             //       {
//                             //         name: 'addToQueue',
//                             //         type: 'bool',
//                             //         value: true,
//                             //       },
//                             //     ],
//                             //   },
//                             //   {
//                             //     contract_address: '0x1f69B519E995e4b5df7d61787B4a74320F0D54Be',
//                             //     function_name: 'setPerformanceFee',
//                             //     state_mutability: 'nonpayable',
//                             //     description: 'Approve the strategy for use in the vault',
//                             //     inputs: [
//                             //       {
//                             //         name: 'strategy',
//                             //         type: 'address',
//                             //         value: '0x9c6864105AEC23388C89600046213a44C384c831',
//                             //       },
//                             //       {
//                             //         name: '_performanceFee',
//                             //         type: 'uint256',
//                             //         value: 0,
//                             //       },
//                             //     ],
//                             //   },
//                             // ];

//                             const addStrategyTxs = listTransactionFn(addStrategyResponse.data.steps ?? []);
//                             console.log('addStrategyTxs', addStrategyTxs);

//                             for (const tx of addStrategyTxs) {
//                                 console.log('Executing add-strategy transaction:', tx);
//                                 // if (tx.address == address) {
//                                 //   tx.address = '0x1f69B519E995e4b5df7d61787B4a74320F0D54Be';
//                                 // }
//                                 const hash = await writeContractAsync(tx);
//                                 submittedHashes.push(hash);

//                                 if (waitForReceipt && publicClient) {
//                                     await publicClient.waitForTransactionReceipt({ hash });
//                                 }
//                             }
//                             await apiPatchStrategyData(addStrategyResponse.data.strategy_id, 'Ready');
//                         } catch (e) {
//                             console.error('Failed to add strategy for protocol:', protocol, e);
//                             toast.error(`Failed to add strategy for protocol ${protocol?.name ?? ''}`);
//                         }
//                     }

//                     toast.success(`Vault created and ${protocolsToAdd.length} strateg${protocolsToAdd.length > 1 ? 'ies' : 'y'} added successfully.`);
//                 } else {
//                     toast.success('Vault created successfully.');
//                 }

//                 onCompletedAll?.(submittedHashes);
//             } catch (error) {
//                 console.error('createVaultFn error:', error);
//                 toast.error('Failed to execute all transactions.');
//                 options?.onError?.(error);
//             }
//         },
//         [options, address, apiCreateVaultCreationStep, listTransactionFn, switchChainFn, publicClient, writeContractAsync, extractNewVaultAddressFromReceipt, apiCreateAddStrategyStep]
//     );

//     return { createVaultFn };
// }
