'use client';
import { getVaultAllocations } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryAllocations() {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['allocations', selectedVault],
        enabled: !!selectedVault,
        queryFn: async () => {
            const data = await getVaultAllocations(selectedVault);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
