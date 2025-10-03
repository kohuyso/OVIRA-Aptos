'use client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

export default function AptosProvider({ children }: { children: React.ReactNode }) {
    return (
        <AptosWalletAdapterProvider autoConnect optInWallets={['Petra', 'Continue with Google', 'Continue with Apple']}>
            {children}
        </AptosWalletAdapterProvider>
    );
}
