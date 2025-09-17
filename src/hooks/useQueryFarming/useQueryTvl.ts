'use client';
import { getVaultTvl } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryTvl() {
    const { selectedVaultName } = useFarmingData();
    return useQuery({
        queryKey: ['tvl', selectedVaultName],
        enabled: !!selectedVaultName,
        queryFn: async () => {
            const data = await getVaultTvl(selectedVaultName);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
