import { Card, CardContent, CardTitle } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function ChartsSectionLoading() {
    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">Assets Allocation</CardTitle>
                <div style={{ height: '300px' }} className="flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="w-48 h-48 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

