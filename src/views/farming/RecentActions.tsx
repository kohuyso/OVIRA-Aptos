import { Card, CardContent, CardTitle } from 'shadcn/card';
import { CircleCheck } from 'lucide-react';
import useQueryRecentActions from 'src/hooks/useQueryFarming/useRecentActions';
import StatusCheckQuery from 'src/components/status/StatusCheckQuery';

// const mockRecentActions: VaultStrategyUpdatedInfo[] = [
//     {
//         timestamp: new Date().toISOString(),
//         action: '1',
//         details: '+5% to USDC Kamino',
//     },
//     {
//         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//         action: 'Risk Alert',
//         details: 'CLMM volatility ↑, reduced exposure',
//     },
//     {
//         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//         action: 'Risk Alert',
//         details: 'CLMM volatility ↑, reduced exposure',
//     },
//     {
//         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
//         action: 'Risk Alert',
//         details: 'CLMM volatility ↑, reduced exposure',
//     },
// ];

export default function RecentActions() {
    const { data: recentActions, status: recentActionsStatus } = useQueryRecentActions(3);
    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">Recent Actions</CardTitle>
                <div style={{ minHeight: '100px' }} className="flex items-center justify-center">
                    <StatusCheckQuery status={recentActionsStatus} noData={Boolean(recentActions?.length == 0)} />
                    {recentActionsStatus === 'success' && recentActions.length > 0 && (
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
                                    {recentActions.map((item, idx) => (
                                        <tr className={idx === recentActions.length - 1 ? '' : 'border-b'} key={`${item.timestamp}-${idx}`}>
                                            <td className="py-2">{new Date(item.timestamp).toLocaleString()}</td>
                                            <td className="py-2">{item.action}</td>
                                            <td className="py-2">{item.details}</td>
                                            <td className="py-2">
                                                <CircleCheck className="w-5 h-5" style={{ color: '#42BE65' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
