import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { Connection, Transaction, SystemProgram } from '@solana/web3.js';
import { getCreateVaultTransaction } from 'src/lib/api';
import { getSelectedChain, getDefaultRpcEndpoint, getSolanaConnectionFactory } from 'src/utils/chain';

export type UseCreateVaultOptions = {
    waitForReceipt?: boolean;
    onCompletedAll?: (...args: [string[]]) => void;
    onError?: (...args: [unknown]) => void;
    // Aptos specific
    contractAddress?: string;
    moduleName?: string;
    // Solana specific
    programId?: string;
    rpcEndpoint?: string;
};

export default function useCreateVault(options?: UseCreateVaultOptions) {
    const selected = getSelectedChain();
    const aptos = useAptosWallet();
    const solana = useSolanaWallet();

    const createVaultFn = useCallback(async () => {
        // Initialize Aptos client
        const config = new AptosConfig({ network: Network.MAINNET });
        const aptosClient = new Aptos(config);
        const { waitForReceipt = true, rpcEndpoint = getDefaultRpcEndpoint() } = options || {};

        if (selected === 'solana') {
            if (!solana.publicKey) {
                toast.error('Wallet not connected.');
                return;
            }
            return 'Hash123';
            // try {
            //     const { endpoints, httpHeaders } = getSolanaConnectionFactory();
            //     let connection = new Connection(endpoints[0], { commitment: 'confirmed', httpHeaders });

            //     // Fetch create vault steps from backend (same as Aptos)
            //     const createVaultData = await getCreateVaultTransaction();
            //     console.log('createVaultData:', createVaultData);

            //     const transactionSteps = createVaultData.steps;
            //     const submittedSignatures: string[] = [];

            //     // Execute each transaction step sequentially
            //     for (const step of transactionSteps) {
            //         try {
            //             // Placeholder: create a transaction per step. Replace with actual program instructions.
            //             const transaction = new Transaction();
            //             transaction.add(
            //                 SystemProgram.transfer({
            //                     fromPubkey: solana.publicKey,
            //                     toPubkey: solana.publicKey, // Placeholder; replace with real program accounts
            //                     lamports: 0,
            //                 })
            //             );

            //             let blockhash: string | undefined;
            //             try {
            //                 const bh = await connection.getLatestBlockhash();
            //                 blockhash = bh.blockhash;
            //             } catch (e) {
            //                 const msg = (e as Error)?.message?.toLowerCase?.() || '';
            //                 if (msg.includes('403') || msg.includes('forbidden')) {
            //                     let connected = false;
            //                     for (let i = 1; i < endpoints.length; i++) {
            //                         try {
            //                             const fallbackConn = new Connection(endpoints[i], { commitment: 'confirmed' });
            //                             const fb = await fallbackConn.getLatestBlockhash();
            //                             connection = fallbackConn;
            //                             blockhash = fb.blockhash;
            //                             connected = true;
            //                             break;
            //                         } catch {
            //                             continue;
            //                         }
            //                     }
            //                     if (!connected) throw e;
            //                 } else {
            //                     throw e;
            //                 }
            //             }
            //             transaction.recentBlockhash = blockhash;
            //             transaction.feePayer = solana.publicKey;

            //             const signedTransaction = await solana.signTransaction!(transaction);
            //             const signature = await solana.sendTransaction(signedTransaction, connection);
            //             submittedSignatures.push(signature);

            //             if (waitForReceipt) {
            //                 try {
            //                     const confirmation = await connection.confirmTransaction(signature, 'confirmed');
            //                     if (confirmation.value.err) {
            //                         toast.error(`Transaction failed for step: ${step.function_name}`);
            //                         return null;
            //                     }
            //                     console.log(`Step ${step.function_name} TX:`, signature);
            //                 } catch (error) {
            //                     console.error(`Error confirming transaction in step ${step.function_name}:`, error);
            //                     toast.error(`Failed to confirm transaction for step: ${step.function_name}`);
            //                     return null;
            //                 }
            //             }
            //         } catch (error) {
            //             console.error(`Error executing step ${step.function_name}:`, error);
            //             toast.error(`Failed to execute step: ${step.function_name}`);
            //             return null;
            //         }
            //     }

            //     toast.success('Vault created successfully.');
            //     return submittedSignatures[submittedSignatures.length - 1];
            // } catch (error) {
            //     console.error('createVaultFn error:', error);
            //     toast.error('Failed to create vault.');
            //     options?.onError?.(error);
            //     return null;
            // }
        } else {
            // Aptos logic
            if (!aptos.account) {
                toast.error('Wallet not connected.');
                return;
            }

            try {
                // Create vault record in backend
                const createVaultData = await getCreateVaultTransaction();

                const transactionSteps = createVaultData.steps;
                const submittedHashes: string[] = [];

                // Execute each transaction step
                for (const step of transactionSteps) {
                    try {
                        // Build the transaction

                        const committed = await aptos.signAndSubmitTransaction({
                            sender: aptos.account.address,
                            data: {
                                function: `${step.contract_address}::${step.module_name}::${step.function_name}`,
                                functionArguments: step.inputs.map((input) => input.value),
                            },
                        });

                        if (!committed) {
                            toast.error(`Failed to submit transaction for step: ${step.function_name}`);
                            return null;
                        }

                        submittedHashes.push(committed.hash);

                        // Wait for transaction receipt if requested
                        if (waitForReceipt) {
                            try {
                                const executed = await aptosClient.waitForTransaction({
                                    transactionHash: committed.hash,
                                });

                                if (!executed.success) {
                                    toast.error(`Transaction failed for step: ${step.function_name}`);
                                    return null;
                                }
                                console.log(`Step ${step.function_name} TX:`, executed.hash);

                                return executed.hash;
                            } catch (error) {
                                console.error(`Error waiting for transaction in step ${step.function_name}:`, error);
                                toast.error(`Failed to confirm transaction for step: ${step.function_name}`);
                                return null;
                            }
                        }
                    } catch (error) {
                        console.error(`Error executing step ${step.function_name}:`, error);
                        toast.error(`Failed to execute step: ${step.function_name}`);
                        return null;
                    }
                }

                toast.success('Vault created successfully.');
                return;
            } catch (error) {
                console.error('createVaultFn error:', error);
                toast.error('Failed to create vault.');
                options?.onError?.(error);
                return null;
            }
        }
    }, [options, selected, aptos, solana]);

    return { createVaultFn };
}
