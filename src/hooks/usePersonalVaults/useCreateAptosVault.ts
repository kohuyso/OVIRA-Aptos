import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { createAptosVault, getAptosVaultTransactionSteps, AptosVaultCreationParams, getCreateVaultTransaction } from 'src/lib/api';

export type UseCreateAptosVaultOptions = {
    waitForReceipt?: boolean;
    onCompletedAll?: (...args: [string[]]) => void;
    onError?: (...args: [unknown]) => void;
    // Contract address for the vault module
    contractAddress?: string;
    // Module name for the vault
    moduleName?: string;
};

export default function useCreateAptosVault(options?: UseCreateAptosVaultOptions) {
    const { account, signAndSubmitTransaction } = useWallet();

    // Initialize Aptos client
    const config = new AptosConfig({ network: Network.MAINNET });
    const aptos = new Aptos(config);

    const createVaultFn = useCallback(async () => {
        const { waitForReceipt = true } = options || {};

        if (!account) {
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
    }, [options, account, aptos, signAndSubmitTransaction]);

    return { createVaultFn };
}
