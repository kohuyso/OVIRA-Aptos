'use client';
import { getExistingVaults } from 'src/lib/api';
import { useFarmingFunction } from 'src/states/atoms/farming/farming';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function useQueryListVaults() {
    const searchParams = useSearchParams();
    const selectedVaultName = searchParams.get('vaultId');
    console.log('selectedVaultName: ', selectedVaultName);

    const { setListVaults, setSelectedVault } = useFarmingFunction();
    return useQuery({
        queryKey: ['listVaults', selectedVaultName],
        enabled: true,
        queryFn: async () => {
            const data = await getExistingVaults();
            setListVaults(data);
            if (Array.isArray(data) && data.length > 0) {
                if (selectedVaultName) {
                    const selected = data.find((v) => v.name === selectedVaultName);
                    if (selected) {
                        setSelectedVault(selected);
                    } else {
                        setSelectedVault(data[0]);
                    }
                } else {
                    setSelectedVault(data[0]);
                }
            }
            return data;
        },
        staleTime: 10000 * 60,
    });
}
