import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { getWithdrawFormVault } from 'src/lib/api';

export type UseWithdrawFormVaultOptions = {
    waitForReceipt?: boolean;
    onCompletedAll?: (...args: [string[]]) => void;
    onError?: (...args: [unknown]) => void;
};

export default function useWithdrawFormVault(options?: UseWithdrawFormVaultOptions) {
    const { account, signAndSubmitTransaction } = useWallet();

    // Initialize Aptos client with useMemo to avoid recreation on every render
    const aptos = useMemo(() => {
        const config = new AptosConfig({ network: Network.MAINNET });
        return new Aptos(config);
    }, []);

    const withdrawFromVaultFn = useCallback(
        async (params: { vault_num: number; token: string; amount: number }) => {
            const { waitForReceipt = true } = options || {};

            if (!account) {
                toast.error('Wallet not connected.');
                return;
            }

            try {
                const { vault_num, token, amount } = params;
                const withdrawResponse = await getWithdrawFormVault({ num_vault: vault_num, token, amount });
                const withdrawSteps = withdrawResponse.steps;
                const submittedHashes: string[] = [];

                // Execute each transaction step
                for (const step of withdrawSteps) {
                    try {
                        const committed = await signAndSubmitTransaction({
                            sender: account.address,
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
                                const executed = await aptos.waitForTransaction({
                                    transactionHash: committed.hash,
                                });

                                if (!executed.success) {
                                    toast.error(`Transaction failed for step: ${step.function_name}`);
                                    return null;
                                }
                                console.log(`Withdraw step ${step.function_name} TX:`, executed.hash);
                            } catch (error) {
                                console.error(`Error waiting for transaction in step ${step.function_name}:`, error);
                                toast.error(`Failed to confirm transaction for step: ${step.function_name}`);
                                return null;
                            }
                        }
                    } catch (error) {
                        console.error(`Error executing withdraw step ${step.function_name}:`, error);
                        toast.error(`Failed to execute step: ${step.function_name}`);
                        return null;
                    }
                }

                toast.success('Withdrawal completed successfully.');
                options?.onCompletedAll?.(submittedHashes);
                return submittedHashes;
            } catch (error) {
                console.error('withdrawFromVaultFn error:', error);
                toast.error('Failed to withdraw from vault.');
                options?.onError?.(error);
                return null;
            }
        },
        [options, account, aptos, signAndSubmitTransaction]
    );

    return { withdrawFromVaultFn };
}
