import { Card, CardContent, CardTitle } from 'src/components/ui/card';
import useQueryVaultLeaderboards from 'src/hooks/usePersonalVaults/useQueryVaultLeaderboards';
import AllVaultStatic from './AllVaultStatic';
import VaultLeaderboard from './VaultLeaderboard';

export default function AdditionalInfoBoard() {
    const { data: leaderboardData } = useQueryVaultLeaderboards();
    console.log('leaderboardData', leaderboardData);

    return (
        <div className="flex w-full max-w-[384px] flex-col gap-2">
            {/* Right Container */}
            <AllVaultStatic />
            <VaultLeaderboard />
        </div>
    );
}
