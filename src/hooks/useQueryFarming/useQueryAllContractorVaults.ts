'use client';
import { getAllVaultContractor } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function useQueryAllContractorVaults() {
    const { address } = useSummaryConnect();
    return useQuery({
        queryKey: ['useQueryAllContractorVaults', address],
        enabled: !!address,
        queryFn: async () => {
            const data = await getAllVaultContractor({ user_address: address });
            return data;
        },
        staleTime: 10000 * 60,
    });
}
