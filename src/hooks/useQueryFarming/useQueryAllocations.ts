'use client';
import { getVaultAllocations } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryAllocations() {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['allocations', selectedVaultName],
        enabled: !!selectedVaultName,
        queryFn: async () => {
            const data = await getVaultAllocations(selectedVaultName);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
