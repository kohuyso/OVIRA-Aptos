import { Card, CardContent } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function TokenSectionLoading() {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-3 w-64" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
