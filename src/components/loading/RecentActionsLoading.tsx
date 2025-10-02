import { Card, CardContent, CardTitle } from 'shadcn/card';
import { Skeleton } from 'shadcn/skeleton';

export default function RecentActionsLoading() {
    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">Recent Actions</CardTitle>
                <div style={{ minHeight: '100px' }} className="flex items-center justify-center">
                    <div className="w-full">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-sm">
                                <thead className="text-muted-foreground">
                                    <tr className="border-b">
                                        <th className="py-2 text-left font-medium">Time</th>
                                        <th className="py-2 text-left font-medium">Action</th>
                                        <th className="py-2 text-left font-medium">Detail</th>
                                        <th className="py-2 text-left font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <tr className={idx === 2 ? '' : 'border-b'} key={idx}>
                                            <td className="py-2">
                                                <Skeleton className="h-4 w-24" />
                                            </td>
                                            <td className="py-2">
                                                <Skeleton className="h-4 w-16" />
                                            </td>
                                            <td className="py-2">
                                                <Skeleton className="h-4 w-32" />
                                            </td>
                                            <td className="py-2">
                                                <Skeleton className="h-5 w-5 rounded-full" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

