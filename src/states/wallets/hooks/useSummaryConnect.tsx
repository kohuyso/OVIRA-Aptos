'use client';
import { ReactElement } from 'react';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { CryptoIcon } from 'src/components/crypto-icons';
import { getSelectedChain } from 'src/utils/chain';

type SummaryConnectInfo = {
    address: string;
    chainId: string;
    chainIcon: ReactElement;
    chainName: string;
    status: 'Connected' | 'Disconnected' | 'Connecting';
    walletIcon: string;
    walletName: string;
    accountName: string;
    disconnect: () => Promise<void> | void;
};

export default function useSummaryConnect(): SummaryConnectInfo {
    const selected = getSelectedChain();
    const aptos = useAptosWallet();
    const solana = useSolanaWallet();

    const solAddress = solana?.publicKey ? solana?.publicKey?.toBase58() : '';
    const aptAddress = aptos.account?.address?.toString() || '';

    if (selected === 'solana') {
        const address = solAddress;
        return {
            address,
            chainId: 'solana_mainnet',
            chainIcon: <CryptoIcon name="SOL" />,
            chainName: 'Solana',
            status: solana.connecting ? 'Connecting' : address ? 'Connected' : 'Disconnected',
            walletIcon: solana.wallet?.adapter?.icon || '',
            walletName: solana.wallet?.adapter?.name || '',
            accountName: address,
            disconnect: async () => {
                try {
                    await solana.disconnect();
                } catch {
                    // ignore
                }
            },
        };
    }

    const address = aptAddress;
    return {
        address,
        chainId: 'aptos_mainnet',
        chainIcon: <CryptoIcon name="APT" />,
        chainName: 'Aptos',
        status: address ? 'Connected' : 'Disconnected',
        walletIcon: aptos.wallet?.icon || '',
        walletName: aptos.wallet?.name || '',
        accountName: address,
        disconnect: () => aptos.disconnect(),
    };
}
