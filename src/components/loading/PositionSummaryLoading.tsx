import { Card, CardContent, CardTitle } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function PositionSummaryLoading() {
    return (
        <Card>
            <CardContent className="relative">
                <CardTitle className="mb-4 text-base">Your position</CardTitle>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Net Value</span>
                        <span className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-8" />
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Earnings</span>
                        <span className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-8" />
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

