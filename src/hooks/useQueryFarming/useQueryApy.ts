'use client';
import { getVaultApy } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryApy() {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['apy', selectedVaultName],
        enabled: !!selectedVaultName,
        queryFn: async () => {
            const data = await getVaultApy(selectedVaultName);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
