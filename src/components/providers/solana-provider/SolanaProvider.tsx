'use client';
import { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { getSolanaRpcConfig } from 'src/utils/chain';

interface Props {
    children: ReactNode;
}

export default function SolanaProvider({ children }: Props) {
    const { endpoint, httpHeaders } = getSolanaRpcConfig();

    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed', httpHeaders }}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
}
