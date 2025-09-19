import { Card, CardContent, CardTitle } from 'shadcn/card';
import useQueryAllVaultStatistics from 'src/hooks/usePersonalVaults/useQueryAllVaultStatistics';

export default function AllVaultStatic() {
    const { data: allVaultData, isLoading } = useQueryAllVaultStatistics();

    return (
        <Card className="bg-card rounded-md p-5">
            {/* My Position Details */}
            <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">All Vault Statistics</CardTitle>
            <CardContent className="mt-3 flex flex-col gap-2 p-0">
                <div className="flex items-center justify-between gap-1">
                    <span className="text-muted-foreground text-sm">Total Personal TVL</span>
                    <div className="flex items-center gap-2">
                        {isLoading ? <span className="h-4 w-28 rounded bg-muted animate-pulse" /> : <span className="text-foreground text-sm font-semibold">${allVaultData?.total_tvls ?? '--'}</span>}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-1">
                    <span className="text-muted-foreground text-sm">Creator</span>
                    <div className="flex items-center gap-2">
                        {isLoading ? <span className="h-4 w-16 rounded bg-muted animate-pulse" /> : <span className="text-foreground text-sm font-semibold">{allVaultData?.num_creators ?? '--'}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
