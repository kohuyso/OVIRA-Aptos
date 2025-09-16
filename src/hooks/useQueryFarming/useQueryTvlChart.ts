'use client';
import { getTvlChart } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryTvlChart(days?: number) {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['tvlChart', selectedVault, days],
        enabled: !!selectedVault && !!days,
        queryFn: async () => {
            const data = await getTvlChart(selectedVault, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
