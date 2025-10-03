'use client';
import { getGetBalance } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';

export default function useQueryUserPosition() {
    const { address } = useSummaryAptosConnect();
    return useQuery({
        queryKey: ['useQueryUserPosition', address],
        enabled: !!address,
        queryFn: async () => {
            const data = await getGetBalance({
                user_address: address,
            });
            return data;
        },
        staleTime: 10000 * 60,
    });
}
