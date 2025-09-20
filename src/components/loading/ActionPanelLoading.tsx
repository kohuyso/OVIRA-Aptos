import { Card, CardContent } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function ActionPanelLoading() {
    return (
        <Card>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-11 w-20" />
                    <Skeleton className="h-11 w-20" />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}
