'use client';
import { getVaultLeaderboards, VaultLeaderboards } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function useQueryVaultLeaderboards() {
    const { chainName } = useSummaryConnect();
    return useQuery<VaultLeaderboards>({
        queryKey: ['vaultLeaderboards'],
        enabled: true,
        queryFn: async () => {
            const data = await getVaultLeaderboards(chainName);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
