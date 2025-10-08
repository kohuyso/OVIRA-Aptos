'use client';
import { useQuery } from '@tanstack/react-query';
import { getPersonalVaults, PersonalVaults } from 'src/lib/api';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function useFetchPersonalVaults(userAddress: string) {
    const { chainName } = useSummaryConnect();
    return useQuery<PersonalVaults>({
        queryKey: ['useFetchPersonalVaults', userAddress],
        enabled: !!userAddress,
        queryFn: async () => {
            const vaults = await getPersonalVaults(userAddress, chainName);
            return vaults;
        },
        staleTime: 10000 * 60,
    });
}
