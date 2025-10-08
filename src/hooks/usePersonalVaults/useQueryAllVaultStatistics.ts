'use client';
import { getAllVaultsStatistics, VaultsStatistics } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function useQueryAllVaultStatistics() {
    const { chainName } = useSummaryConnect();
    return useQuery<VaultsStatistics>({
        queryKey: ['allVaultStatistics'],
        enabled: true,
        queryFn: async () => {
            const data = await getAllVaultsStatistics(chainName);
            return data;
        },
        staleTime: 10000 * 60,
    });
}
