'use client';
import { getAllVaultContractor } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';

export default function useQueryAllContractorVaults() {
    const { address } = useSummaryAptosConnect();
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
