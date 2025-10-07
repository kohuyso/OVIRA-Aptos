import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { Connection, Transaction, SystemProgram } from '@solana/web3.js';
import { getDepositToVault } from 'src/lib/api';
import { getSelectedChain, getDefaultRpcEndpoint, getSolanaConnectionFactory } from 'src/utils/chain';

export type UseDepositToVaultOptions = {
    waitForReceipt?: boolean;
    onCompletedAll?: (...args: [string[]]) => void;
    onError?: (...args: [unknown]) => void;
    // Solana specific
    rpcEndpoint?: string;
};

export default function useDepositToVault(options?: UseDepositToVaultOptions) {
    const selected = getSelectedChain();
    const aptos = useAptosWallet();
    const solana = useSolanaWallet();

    // Initialize Aptos client with useMemo to avoid recreation on every render
    const aptosClient = useMemo(() => {
        const config = new AptosConfig({ network: Network.MAINNET });
        return new Aptos(config);
    }, []);

    const depositToVaultFn = useCallback(
        async (params: { vault_num: number; token: string; amount: number }) => {
            const { waitForReceipt = true, rpcEndpoint = getDefaultRpcEndpoint() } = options || {};

            if (selected === 'solana') {
                if (!solana.publicKey) {
                    toast.error('Wallet not connected.');
                    return;
                }

                try {
                    const { endpoints, httpHeaders } = getSolanaConnectionFactory();
                    let connection = new Connection(endpoints[0], { commitment: 'confirmed', httpHeaders });

                    // Create deposit transaction for Solana
                    const transaction = new Transaction();

                    transaction.add(
                        SystemProgram.transfer({
                            fromPubkey: solana.publicKey,
                            toPubkey: solana.publicKey, // Placeholder
                            lamports: 0,
                        })
                    );

                    let blockhash: string | undefined;
                    try {
                        const bh = await connection.getLatestBlockhash();
                        blockhash = bh.blockhash;
                    } catch (e) {
                        const msg = (e as Error)?.message?.toLowerCase?.() || '';
                        if (msg.includes('403') || msg.includes('forbidden')) {
                            let connected = false;
                            for (let i = 1; i < endpoints.length; i++) {
                                try {
                                    const fallbackConn = new Connection(endpoints[i], { commitment: 'confirmed' });
                                    const fb = await fallbackConn.getLatestBlockhash();
                                    connection = fallbackConn;
                                    blockhash = fb.blockhash;
                                    connected = true;
                                    break;
                                } catch {
                                    continue;
                                }
                            }
                            if (!connected) throw e;
                        } else {
                            throw e;
                        }
                    }
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = solana.publicKey;

                    const signedTransaction = await solana.signTransaction!(transaction);
                    const signature = await solana.sendTransaction(signedTransaction, connection);

                    if (waitForReceipt) {
                        try {
                            const confirmation = await connection.confirmTransaction(signature, 'confirmed');

                            if (confirmation.value.err) {
                                toast.error('Deposit transaction failed');
                                return null;
                            }

                            console.log('Deposit TX:', signature);
                            toast.success('Deposit completed successfully.');
                            options?.onCompletedAll?.([signature]);
                            return [signature];
                        } catch (error) {
                            console.error('Error confirming deposit transaction:', error);
                            toast.error('Failed to confirm deposit transaction');
                            return null;
                        }
                    }

                    toast.success('Deposit transaction sent.');
                    return [signature];
                } catch (error) {
                    console.error('depositToVaultFn error:', error);
                    toast.error('Failed to deposit to vault.');
                    options?.onError?.(error);
                    return null;
                }
            } else {
                // Aptos logic
                if (!aptos.account) {
                    toast.error('Wallet not connected.');
                    return;
                }

                try {
                    const { vault_num, token, amount } = params;
                    const depositResponse = await getDepositToVault({ num_vault: vault_num, token, amount });
                    const depositSteps = depositResponse.steps;
                    const submittedHashes: string[] = [];

                    // Execute each transaction step
                    for (const step of depositSteps) {
                        try {
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
                                    console.log(`Deposit step ${step.function_name} TX:`, executed.hash);
                                } catch (error) {
                                    console.error(`Error waiting for transaction in step ${step.function_name}:`, error);
                                    toast.error(`Failed to confirm transaction for step: ${step.function_name}`);
                                    return null;
                                }
                            }
                        } catch (error) {
                            console.error(`Error executing deposit step ${step.function_name}:`, error);
                            toast.error(`Failed to execute step: ${step.function_name}`);
                            return null;
                        }
                    }

                    toast.success('Deposit completed successfully.');
                    options?.onCompletedAll?.(submittedHashes);
                    return submittedHashes;
                } catch (error) {
                    console.error('depositToVaultFn error:', error);
                    toast.error('Failed to deposit to vault.');
                    options?.onError?.(error);
                    return null;
                }
            }
        },
        [options, selected, aptos, solana, aptosClient]
    );

    return { depositToVaultFn };
}
