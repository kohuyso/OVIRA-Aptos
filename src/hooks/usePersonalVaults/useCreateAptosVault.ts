// import { useCallback } from 'react';
// import { toast } from 'react-toastify';
// import { useWallet } from '@aptos-labs/wallet-adapter-react';
// import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
// import { createAptosVault, getAptosVaultTransactionSteps, AptosVaultCreationParams } from 'src/lib/api';

// export type UseCreateAptosVaultOptions = {
//     waitForReceipt?: boolean;
//     onCompletedAll?: (...args: [string[]]) => void;
//     onError?: (...args: [unknown]) => void;
//     // Contract address for the vault module
//     contractAddress?: string;
//     // Module name for the vault
//     moduleName?: string;
// };

// export default function useCreateAptosVault(options?: UseCreateAptosVaultOptions) {
//     const { account, signAndSubmitTransaction } = useWallet();

//     // Initialize Aptos client
//     const config = new AptosConfig({ network: Network.DEVNET });
//     const aptos = new Aptos(config);

//     const createVaultFn = useCallback(
//         async (vaultName: string, vaultAssetAddress: string, vaultShareTokenName: string, vaultShareTokenSymbol: string, profitMaxUnlockTime: number, managementFee: number) => {
//             const { waitForReceipt = true, onCompletedAll, contractAddress, moduleName = 'vault_module' } = options || {};

//             if (!account) {
//                 toast.error('Wallet not connected.');
//                 return;
//             }

//             if (!contractAddress) {
//                 toast.error('Contract address not provided.');
//                 return;
//             }

//             try {
//                 // First, create the vault record in the backend
//                 const vaultParams: AptosVaultCreationParams = {
//                     vault_name: vaultName,
//                     owner_wallet_address: account.address,
//                     vault_asset_address: vaultAssetAddress,
//                     vault_share_token_name: vaultShareTokenName,
//                     vault_share_token_symbol: vaultShareTokenSymbol,
//                     profit_max_unlock_time: profitMaxUnlockTime,
//                     management_fee: managementFee,
//                     contract_address: contractAddress,
//                     module_name: moduleName,
//                 };

//                 // Create vault record in backend
//                 await createAptosVault(vaultParams);

//                 // Get transaction steps from backend
//                 const transactionSteps = await getAptosVaultTransactionSteps({
//                     vault_name: vaultName,
//                     owner_wallet_address: account.address,
//                     contract_address: contractAddress,
//                     module_name: moduleName,
//                 });

//                 const submittedHashes: string[] = [];

//                 // Execute each transaction step
//                 for (const step of transactionSteps.steps) {
//                     try {
//                         // Build the transaction
//                         const transaction = await aptos.transaction.build.simple({
//                             sender: account.address,
//                             data: {
//                                 function: `${step.contract_address}::${step.module_name}::${step.function_name}`,
//                                 functionArguments: step.inputs.map((input) => input.value),
//                             },
//                         });

//                         // Sign and submit the transaction
//                         const committed = await signAndSubmitTransaction(transaction);

//                         if (!committed) {
//                             toast.error(`Failed to submit transaction for step: ${step.function_name}`);
//                             return;
//                         }

//                         submittedHashes.push(committed.hash);

//                         // Wait for transaction receipt if requested
//                         if (waitForReceipt) {
//                             try {
//                                 const executed = await aptos.waitForTransaction({
//                                     transactionHash: committed.hash,
//                                 });

//                                 if (!executed.success) {
//                                     toast.error(`Transaction failed for step: ${step.function_name}`);
//                                     return;
//                                 }

//                                 console.log(`Step ${step.function_name} TX:`, executed.hash);
//                             } catch (error) {
//                                 console.error(`Error waiting for transaction in step ${step.function_name}:`, error);
//                                 toast.error(`Failed to confirm transaction for step: ${step.function_name}`);
//                                 return;
//                             }
//                         }
//                     } catch (error) {
//                         console.error(`Error executing step ${step.function_name}:`, error);
//                         toast.error(`Failed to execute step: ${step.function_name}`);
//                         return;
//                     }
//                 }

//                 toast.success('Vault created successfully.');
//                 onCompletedAll?.(submittedHashes);
//             } catch (error) {
//                 console.error('createVaultFn error:', error);
//                 toast.error('Failed to create vault.');
//                 options?.onError?.(error);
//             }
//         },
//         [options, account, aptos, signAndSubmitTransaction]
//     );

//     return { createVaultFn };
// }
