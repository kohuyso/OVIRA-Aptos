'use client';
import { getGetBalance } from 'src/lib/api';
import { useQuery } from '@tanstack/react-query';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function useQueryUserPosition() {
    const { address } = useSummaryConnect();
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
