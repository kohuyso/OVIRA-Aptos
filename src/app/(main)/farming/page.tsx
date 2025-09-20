'use client';
import { Suspense } from 'react';
import TokenSection from 'src/views/farming/TokenSection';
import GraphSection from 'src/views/farming/Graph/GraphSection';
import RecentActions from 'src/views/farming/RecentActions';
import ActionPanel from 'src/views/farming/Actions/ActionPanel';
import PositionSummary from 'src/views/farming/PositionSummary';
import ChartsSection from 'src/views/farming/PieChart/ChartsSection';
import ReasoningTrace from 'src/views/farming/ReasoningTrace';
import {
    TokenSectionLoading,
    GraphSectionLoading,
    RecentActionsLoading,
    ActionPanelLoading,
    PositionSummaryLoading,
    ChartsSectionLoading,
    ReasoningTraceLoading,
    VaultSwitchingOverlay,
} from 'src/components/loading';
import LoadingWrapper from 'src/components/loading/LoadingWrapper';
import useFarmingLoadingStates from 'src/hooks/useFarmingLoadingStates';

function FarmingContent() {
    const { tokenSectionLoading, graphSectionLoading, recentActionsLoading, actionPanelLoading, positionSummaryLoading, chartsSectionLoading, reasoningTraceLoading, isVaultSwitching } =
        useFarmingLoadingStates();

    return (
        <div className="flex flex-col">
            <div className="grid gap-2 lg:grid-cols-[1fr_384px]">
                <div className="flex flex-col gap-2">
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={tokenSectionLoading} loadingComponent={<TokenSectionLoading />}>
                            <TokenSection />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={graphSectionLoading} loadingComponent={<GraphSectionLoading />}>
                            <GraphSection />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={reasoningTraceLoading} loadingComponent={<ReasoningTraceLoading />}>
                            <ReasoningTrace />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={recentActionsLoading} loadingComponent={<RecentActionsLoading />}>
                            <RecentActions />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                </div>
                <div className="flex flex-col gap-2">
                    <LoadingWrapper isLoading={actionPanelLoading} loadingComponent={<ActionPanelLoading />}>
                        <ActionPanel />
                    </LoadingWrapper>
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={positionSummaryLoading} loadingComponent={<PositionSummaryLoading />}>
                            <PositionSummary comingSoon />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                    <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                        <LoadingWrapper isLoading={chartsSectionLoading} loadingComponent={<ChartsSectionLoading />}>
                            <ChartsSection />
                        </LoadingWrapper>
                    </VaultSwitchingOverlay>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <FarmingContent />
        </Suspense>
    );
}
