'use client';
import useQueryListVaults from 'src/hooks/useQueryFarming/useQueryListVaults';
import TokenSection from 'src/views/farming/TokenSection';
import GraphSection from 'src/views/farming/Graph/GraphSection';
import RecentActions from 'src/views/farming/RecentActions';
import ActionPanel from 'src/views/farming/Actions/ActionPanel';
import PositionSummary from 'src/views/farming/PositionSummary';
import ChartsSection from 'src/views/farming/PieChart/ChartsSection';
import ReasoningTrace from 'src/views/farming/ReasoningTrace';

export default function Page() {
    useQueryListVaults();
    return (
        <div className="flex flex-col">
            <div className="grid gap-2 lg:grid-cols-[1fr_384px]">
                <div className="flex flex-col gap-2">
                    <TokenSection />
                    <GraphSection />
                    <ReasoningTrace />
                    <RecentActions />
                </div>
                <div className="flex flex-col gap-2">
                    <ActionPanel />
                    <PositionSummary />
                    <ChartsSection />
                </div>
            </div>
        </div>
    );
}
