'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserBalanceEarnings } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';

export default function useQueryEarnings() {
    const { selectedVaultName } = useFarmingData();
    const { address: userWallet } = useSummaryAptosConnect();

    return useQuery<number>({
        queryKey: ['earnings', selectedVaultName, userWallet],
        enabled: !!selectedVaultName && !!userWallet,
        queryFn: async () => {
            const data = await getUserBalanceEarnings({ user_wallet: userWallet, vault_name: selectedVaultName });
            return data;
        },
        staleTime: 60 * 1000,
    });
}
