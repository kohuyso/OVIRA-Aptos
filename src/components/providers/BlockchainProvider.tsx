'use client';
import { ReactNode } from 'react';
import AptosProvider from './aptos-provider/AptosProvider';
import SolanaProvider from './solana-provider/SolanaProvider';
import { getSelectedChain } from 'src/utils/chain';

interface Props {
    children: ReactNode;
}

export default function BlockchainProvider({ children }: Props) {
    const selected = getSelectedChain();
    if (selected === 'solana') {
        return <SolanaProvider>{children}</SolanaProvider>;
    }
    return <AptosProvider>{children}</AptosProvider>;
}
