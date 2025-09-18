import { useQuery } from '@tanstack/react-query';
import { getExistingVaults } from 'src/lib/api';
import type { TVault } from 'src/states/atoms/farming/farming';

export default function useFetchPersonalVaults(userAddress: string) {
    return useQuery<TVault[]>({
        queryKey: ['useFetchPersonalVaults', userAddress],
        enabled: !!userAddress,
        queryFn: async () => {
            // For now, fetch all existing vaults. If API supports filtering by owner,
            // we can replace this with a dedicated endpoint.
            const vaults = await getExistingVaults();
            return vaults;
        },
        staleTime: 10000 * 60,
    });
}
