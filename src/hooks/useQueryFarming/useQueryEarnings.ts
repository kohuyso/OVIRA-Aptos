'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserBalanceNetValue } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

export default function useQueryNetValue() {
    const { selectedVaultName } = useFarmingData();
    const { address: userWallet } = useSummarySolanaConnect();

    return useQuery<number>({
        queryKey: ['netValue', selectedVaultName, userWallet],
        enabled: !!selectedVaultName && !!userWallet,
        queryFn: async () => {
            const data = await getUserBalanceNetValue({ user_wallet: userWallet, vault_name: selectedVaultName });
            return data;
        },
        staleTime: 60 * 1000,
    });
}
