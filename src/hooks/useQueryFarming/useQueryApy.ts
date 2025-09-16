'use client';
import { getVaultApy } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryApy() {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['apy', selectedVault],
        enabled: !!selectedVault,
        queryFn: async () => {
            const data = await getVaultApy(selectedVault);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
