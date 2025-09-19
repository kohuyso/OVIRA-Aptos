'use client';
import { getVaultLeaderboards, VaultLeaderboards } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function useQueryVaultLeaderboards() {
    return useQuery<VaultLeaderboards>({
        queryKey: ['vaultLeaderboards'],
        enabled: true,
        queryFn: async () => {
            const data = await getVaultLeaderboards();
            return data;
        },
        staleTime: 10000 * 60,
    });
}
