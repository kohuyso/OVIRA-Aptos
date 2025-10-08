'use client';
import { useQuery } from '@tanstack/react-query';
import { getStrategyReasoning, ReasoningTrace } from 'src/lib/api';
import { useFarmingData } from 'src/states/atoms/farming/farming';

export default function useQueryReasoningTrace() {
    const { selectedVault } = useFarmingData();

    return useQuery<ReasoningTrace[]>({
        queryKey: ['reasoningTrace', selectedVault],
        enabled: !!selectedVault,
        queryFn: async () => {
            const data = await getStrategyReasoning({
                session_id: selectedVault.strategy_session_id,
            });
            console.log('Fetched reasoning trace:', data);

            return data.reasonings;
        },
        staleTime: 60 * 1000,
    });
}
