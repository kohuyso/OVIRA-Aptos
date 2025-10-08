import { Card, CardContent } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function GraphSectionLoading() {
    return (
        <Card style={{ paddingTop: '0px' }}>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-end">
                        <div className="text-left p-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-8" />
                            </div>
                            <Skeleton className="h-8 w-16 mt-2" />
                        </div>
                        <div className="text-left p-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-8" />
                            </div>
                            <Skeleton className="h-8 w-16 mt-2" />
                        </div>
                    </div>
                    <div className="w-72">
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>
                <div className="mt-4" style={{ height: '295px' }}>
                    <Skeleton className="w-full h-full" />
                </div>
            </CardContent>
        </Card>
    );
}

