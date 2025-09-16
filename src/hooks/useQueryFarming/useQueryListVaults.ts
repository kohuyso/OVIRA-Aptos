'use client';
import { getExistingVaults } from 'src/lib/api';
import { useFarmingFunction } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';

export default function useQueryListVaults() {
    const { setListVaults, setSelectedVault } = useFarmingFunction();
    return useQuery({
        queryKey: ['listVaults'],
        enabled: true,
        queryFn: async () => {
            const data = await getExistingVaults();
            setListVaults(data);
            if (Array.isArray(data) && data.length > 0) {
                setSelectedVault(data[0]);
            }
            return data;
        },
        staleTime: 10000 * 60,
    });
}
