'use client';
import { useQuery } from '@tanstack/react-query';
import { getVaultReasoningTrace, ReasoningTrace } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';

export default function useQueryReasoningTrace() {
    const { selectedVault } = useFarmingData();

    return useQuery<ReasoningTrace[]>({
        queryKey: ['reasoningTrace', selectedVault],
        enabled: !!selectedVault,
        queryFn: async () => {
            const data = await getVaultReasoningTrace(selectedVault);
            return data;
        },
        staleTime: 60 * 1000,
    });
}
