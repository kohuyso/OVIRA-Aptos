'use client';
import { getVaultTvl } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryTvl() {
    const { selectedVault } = useFarmingData();
    return useQuery({
        queryKey: ['tvl', selectedVault],
        enabled: !!selectedVault,
        queryFn: async () => {
            const data = await getVaultTvl(selectedVault);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
