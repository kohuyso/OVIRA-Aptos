'use client';
import { getRecentActions } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryRecentActions(days?: number) {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['recentActions', selectedVaultName, days],
        enabled: !!selectedVaultName && !!days,
        queryFn: async () => {
            const data = await getRecentActions(selectedVaultName, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
