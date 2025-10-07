import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export type UseCreateSolanaVaultOptions = {
    waitForReceipt?: boolean;
    onCompletedAll?: (...args: [string[]]) => void;
    onError?: (...args: [unknown]) => void;
    // Program ID for the vault program
    programId?: string;
    // RPC endpoint
    rpcEndpoint?: string;
};

export default function useCreateSolanaVault(options?: UseCreateSolanaVaultOptions) {
    const { publicKey, sendTransaction, signTransaction } = useWallet();

    const createVaultFn = useCallback(async () => {
        const { waitForReceipt = true, rpcEndpoint = 'https://api.mainnet-beta.solana.com' } = options || {};

        if (!publicKey) {
            toast.error('Wallet not connected.');
            return;
        }

        try {
            const connection = new Connection(rpcEndpoint, 'confirmed');

            // Create vault record in backend (you'll need to implement this API endpoint for Solana)
            // For now, we'll create a simple transaction as a placeholder
            const transaction = new Transaction();

            // Add a simple instruction - you'll replace this with your actual vault creation logic
            const programId = options?.programId ? new PublicKey(options.programId) : SystemProgram.programId;

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: publicKey, // This is just a placeholder
                    lamports: 0, // No actual transfer, just creating a transaction
                })
            );

            // Set recent blockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            // Sign and send transaction
            const signedTransaction = await signTransaction!(transaction);
            const signature = await sendTransaction(signedTransaction, connection);

            if (waitForReceipt) {
                try {
                    const confirmation = await connection.confirmTransaction(signature, 'confirmed');

                    if (confirmation.value.err) {
                        toast.error('Transaction failed');
                        return null;
                    }

                    console.log('Vault creation TX:', signature);
                    toast.success('Vault created successfully.');
                    return signature;
                } catch (error) {
                    console.error('Error confirming transaction:', error);
                    toast.error('Failed to confirm transaction');
                    return null;
                }
            }

            toast.success('Vault creation transaction sent.');
            return signature;
        } catch (error) {
            console.error('createVaultFn error:', error);
            toast.error('Failed to create vault.');
            options?.onError?.(error);
            return null;
        }
    }, [options, publicKey, sendTransaction, signTransaction]);

    return { createVaultFn };
}
