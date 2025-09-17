'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserBalanceEarnings } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

export default function useQueryEarnings() {
    const { selectedVault } = useFarmingData();
    const { address: userWallet } = useSummarySolanaConnect();

    return useQuery<number>({
        queryKey: ['earnings', selectedVault, userWallet],
        enabled: !!selectedVault && !!userWallet,
        queryFn: async () => {
            const data = await getUserBalanceEarnings({ user_wallet: userWallet, vault_name: selectedVault });
            return data;
        },
        staleTime: 60 * 1000,
    });
}
