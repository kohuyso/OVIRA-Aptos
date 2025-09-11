// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
'use client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { solNetworkSelect } from 'src/states/wallets/solana-blockchain/configs';

export default function SolanaProvider({ children }: { children: React.ReactNode }) {
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(solNetworkSelect), []);

    const wallets = useMemo(() => [new SolflareWalletAdapter({ network: solNetworkSelect })], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect localStorageKey="solana.connectWallet">
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
}
