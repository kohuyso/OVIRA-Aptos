'use client';
import { useQuery } from '@tanstack/react-query';
import { getPersonalVaults, PersonalVaults } from 'src/lib/api';

export default function useFetchPersonalVaults(userAddress: string) {
    return useQuery<PersonalVaults>({
        queryKey: ['useFetchPersonalVaults', userAddress],
        enabled: !!userAddress,
        queryFn: async () => {
            const vaults = await getPersonalVaults(userAddress);
            return vaults;
        },
        staleTime: 10000 * 60,
    });
}
