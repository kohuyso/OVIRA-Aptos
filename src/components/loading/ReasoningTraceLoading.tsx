import { Card, CardContent, CardTitle } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function ReasoningTraceLoading() {
    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">AI Reasoning Trace</CardTitle>
                <div style={{ height: '300px' }} className="grid grid-cols-[120px_1fr]">
                    <div className="overflow-y-auto border-r border-t">
                        <div className="flex flex-col">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="flex items-center gap-3 py-2">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-full overflow-y-auto border-t">
                        <div className="flex flex-col gap-4 p-3 pr-20">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div key={idx} className="flex items-end gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="bg-popover px-3 py-2 rounded-md">
                                            <Skeleton className="h-4 w-16 mb-2" />
                                            <Skeleton className="h-3 w-full mb-1" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
