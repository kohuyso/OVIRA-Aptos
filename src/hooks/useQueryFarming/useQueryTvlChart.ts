'use client';
import { getTvlChart } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryTvlChart(days?: number) {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['tvlChart', selectedVaultName, days],
        enabled: !!selectedVaultName && !!days,
        queryFn: async () => {
            const data = await getTvlChart(selectedVaultName, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
