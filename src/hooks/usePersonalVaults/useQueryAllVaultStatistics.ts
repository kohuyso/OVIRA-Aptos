'use client';
import { getAllVaultsStatistics, VaultsStatistics } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function useQueryAllVaultStatistics() {
    return useQuery<VaultsStatistics>({
        queryKey: ['allVaultStatistics'],
        enabled: true,
        queryFn: async () => {
            const data = await getAllVaultsStatistics();
            return data;
        },
        staleTime: 10000 * 60,
    });
}
