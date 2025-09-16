'use client';
import { getApyChart } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryApyChart(days?: number) {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['apyChart', selectedVault, days],
        enabled: !!selectedVault && !!days,
        queryFn: async () => {
            const data = await getApyChart(selectedVault, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
