'use client';
import { getRecentActions } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryRecentActions(days?: number) {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['recentActions', selectedVault, days],
        enabled: !!selectedVault && !!days,
        queryFn: async () => {
            const data = await getRecentActions(selectedVault, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
