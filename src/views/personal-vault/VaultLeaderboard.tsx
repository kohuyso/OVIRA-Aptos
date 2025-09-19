import { Card, CardContent } from 'shadcn/card';
import useQueryVaultLeaderboards from 'src/hooks/usePersonalVaults/useQueryVaultLeaderboards';
import { VaultLeaderboardEntry } from 'src/lib/api';

function MiniLeaderboardRow({ apy, vault_name, placement }: VaultLeaderboardEntry & { placement: number }) {
    return (
        <div className="flex items-center gap-4 py-1">
            <div className="text-foreground w-[31px] text-sm font-medium">{placement}</div>
            <div className="flex w-full items-center justify-between gap-2">
                <span className="text-foreground text-sm">{vault_name}</span>
                <span className="text-foreground text-sm font-semibold">{apy.toFixed(5)}% </span>
            </div>
        </div>
    );
}

export default function VaultLeaderboard() {
    const { data: leaderboardData, isLoading } = useQueryVaultLeaderboards();

    return (
        <Card className="bg-card rounded-md p-4">
            {/* Mini Leaderboard */}
            <div className="flex flex-col gap-3">
                <div>
                    <div className="text-foreground w-[318px] text-base font-semibold leading-[1.5] tracking-[-0.0125em]">Mini Leaderboard</div>
                </div>

                <CardContent className="flex flex-col gap-2 p-0">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground w-[31px] text-sm">#</span>
                            <span className="text-muted-foreground text-sm">Vault</span>
                        </div>
                        <span className="text-muted-foreground text-sm">APY</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        {isLoading &&
                            Array.from({ length: 10 }).map((_, idx) => (
                                <div key={idx} className="flex items-center gap-4 py-1 animate-pulse">
                                    <div className="w-[31px] h-4 rounded bg-muted" />
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <span className="h-4 w-40 rounded bg-muted" />
                                        <span className="h-4 w-24 rounded bg-muted" />
                                    </div>
                                </div>
                            ))}

                        {!isLoading &&
                            leaderboardData &&
                            Object.values(leaderboardData).length > 0 &&
                            Object.values(leaderboardData).map((item, index) => <MiniLeaderboardRow key={item.vault_name} placement={index + 1} {...item} />)}

                        {!isLoading && (!leaderboardData || Object.values(leaderboardData).length === 0) && <div className="py-2 text-sm text-muted-foreground">No leaderboard data available.</div>}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
