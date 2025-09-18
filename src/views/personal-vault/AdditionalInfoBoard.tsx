import { Card, CardContent, CardTitle } from 'src/components/ui/card';

type LeaderboardItem = {
    placement: number;
    name: string;
    apyPercent: string;
};

const leaderboardData: LeaderboardItem[] = [
    { placement: 1, name: 'Aggro Yield Play', apyPercent: '68,95 %' },
    { placement: 2, name: 'ETH Stable Strategy', apyPercent: '4,11 %' },
    { placement: 3, name: 'Stable Yield USDC', apyPercent: '87,19 %' },
    { placement: 4, name: 'Stablecoin Ladder', apyPercent: '54,72 %' },
    { placement: 5, name: 'ETH + LST Mix', apyPercent: '3,92 %' },
];

function MiniLeaderboardRow({ item }: { item: LeaderboardItem }) {
    return (
        <div className="flex items-center gap-4 py-1">
            <div className="text-foreground w-[31px] text-sm font-medium">{item.placement}</div>
            <div className="flex w-full items-center justify-between gap-2">
                <span className="text-foreground text-sm">{item.name}</span>
                <span className="text-foreground text-sm font-semibold">{item.apyPercent}</span>
            </div>
        </div>
    );
}

export default function AdditionalInfoBoard() {
    return (
        <div className="flex w-full max-w-[384px] flex-col gap-2">
            {/* Right Container */}
            <Card className="bg-card rounded-md p-5">
                {/* My Position Details */}
                <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">All Vault Statistics</CardTitle>
                <CardContent className="mt-3 flex flex-col gap-2 p-0">
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-muted-foreground text-sm">Total Personal TVL</span>
                        <div className="flex items-center gap-2">
                            <span className="text-foreground text-sm font-semibold">$3.1 M</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-muted-foreground text-sm">Creator</span>
                        <div className="flex items-center gap-2">
                            <span className="text-foreground text-sm font-semibold">124</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

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
                            {leaderboardData.map((item) => (
                                <MiniLeaderboardRow key={item.placement} item={item} />
                            ))}
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
