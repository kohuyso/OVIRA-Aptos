'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserBalanceNetValue } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

export default function useQueryNetValue() {
    const { selectedVault } = useFarmingData();
    const { address: userWallet } = useSummarySolanaConnect();

    return useQuery<number>({
        queryKey: ['netValue', selectedVault, userWallet],
        enabled: !!selectedVault && !!userWallet,
        queryFn: async () => {
            const data = await getUserBalanceNetValue({ user_wallet: userWallet, vault_name: selectedVault });
            return data;
        },
        staleTime: 60 * 1000,
    });
}
