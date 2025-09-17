'use client';
import { getApyChart } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryApyChart(days?: number) {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['apyChart', selectedVaultName, days],
        enabled: !!selectedVaultName && !!days,
        queryFn: async () => {
            const data = await getApyChart(selectedVaultName, days);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
