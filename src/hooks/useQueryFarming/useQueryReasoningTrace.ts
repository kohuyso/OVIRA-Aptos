'use client';
import { useQuery } from '@tanstack/react-query';
import { getVaultReasoningTrace, ReasoningTrace } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';

export default function useQueryReasoningTrace() {
    const { selectedVaultName } = useFarmingData();

    return useQuery<ReasoningTrace[]>({
        queryKey: ['reasoningTrace', selectedVaultName],
        enabled: !!selectedVaultName,
        queryFn: async () => {
            const data = await getVaultReasoningTrace(selectedVaultName);
            return data;
        },
        staleTime: 60 * 1000,
    });
}
