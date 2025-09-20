import useQueryListVaults from './useQueryFarming/useQueryListVaults';
import useQueryApy from './useQueryFarming/useQueryApy';
import useQueryTvl from './useQueryFarming/useQueryTvl';
import useQueryApyChart from './useQueryFarming/useQueryApyChart';
import useQueryTvlChart from './useQueryFarming/useQueryTvlChart';
import useQueryRecentActions from './useQueryFarming/useRecentActions';
import useQueryAllocations from './useQueryFarming/useQueryAllocations';
import useQueryReasoningTrace from './useQueryFarming/useQueryReasoningTrace';
import useQueryNetValue from './useQueryFarming/useQueryNetValue';
import useQueryEarnings from './useQueryFarming/useQueryEarnings';
import useVaultSwitching from './useVaultSwitching';

export default function useFarmingLoadingStates() {
    const { status: listVaultsStatus } = useQueryListVaults();
    const { status: apyStatus } = useQueryApy();
    const { status: tvlStatus } = useQueryTvl();
    const { status: apyChartStatus } = useQueryApyChart(7);
    const { status: tvlChartStatus } = useQueryTvlChart(7);
    const { status: recentActionsStatus } = useQueryRecentActions(3);
    const { status: allocationsStatus } = useQueryAllocations();
    const { status: reasoningTraceStatus } = useQueryReasoningTrace();
    const { status: netValueStatus } = useQueryNetValue();
    const { status: earningsStatus } = useQueryEarnings();
    const { isVaultSwitching } = useVaultSwitching();

    return {
        // Global loading - if any critical data is loading
        isGlobalLoading: listVaultsStatus === 'pending',

        // Vault switching state
        isVaultSwitching,

        // Individual component loading states (include vault switching)
        tokenSectionLoading: listVaultsStatus === 'pending' || isVaultSwitching,
        graphSectionLoading: apyStatus === 'pending' || tvlStatus === 'pending' || apyChartStatus === 'pending' || tvlChartStatus === 'pending' || isVaultSwitching,
        recentActionsLoading: recentActionsStatus === 'pending' || isVaultSwitching,
        actionPanelLoading: false, // ActionPanel doesn't have async data
        positionSummaryLoading: netValueStatus === 'pending' || earningsStatus === 'pending' || isVaultSwitching,
        chartsSectionLoading: allocationsStatus === 'pending' || isVaultSwitching,
        reasoningTraceLoading: reasoningTraceStatus === 'pending' || isVaultSwitching,

        // Individual statuses for more granular control
        statuses: {
            listVaults: listVaultsStatus,
            apy: apyStatus,
            tvl: tvlStatus,
            apyChart: apyChartStatus,
            tvlChart: tvlChartStatus,
            recentActions: recentActionsStatus,
            allocations: allocationsStatus,
            reasoningTrace: reasoningTraceStatus,
            netValue: netValueStatus,
            earnings: earningsStatus,
            vaultSwitching: isVaultSwitching,
        },
    };
}
