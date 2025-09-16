import { Card, CardContent, CardTitle } from 'shadcn/card';
import useQueryReasoningTrace from 'src/hooks/useQueryFarming/useQueryReasoningTrace';
import StatusCheckQuery from 'src/components/status/StatusCheckQuery';

export default function ReasoningTrace() {
    const { data: traces, status } = useQueryReasoningTrace();

    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">AI Reasoning Trace</CardTitle>
                {status !== 'success' || (traces && traces.length === 0) ? (
                    <div style={{ height: '300px' }} className="flex items-center justify-center">
                        <StatusCheckQuery status={status} noData={Boolean(traces?.length == 0)} />
                    </div>
                ) : (
                    <div style={{ maxHeight: '300px' }} className="grid grid-cols-[120px_1fr]">
                        <div className="overflow-y-auto border-r border-t">
                            <div className="flex flex-col">
                                {[...new Set(traces.map((t) => t.role))].map((role) => (
                                    <div key={role} className="flex items-center gap-3 py-2">
                                        <div className="w-8 h-8 rounded-full bg-muted border" />
                                        <div className="text-sm font-medium capitalize">{role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-full overflow-y-auto border-t">
                            <div className="flex flex-col gap-4 p-3 pr-20">
                                {traces.map((item, idx) => (
                                    <div key={`${item.role}-${idx}`} className="flex items-end gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted border flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="bg-popover px-3 py-2 rounded-md">
                                                <p className="text-sm font-semibold text-foreground capitalize">{item.role}</p>
                                                <p className="text-xs text-foreground leading-relaxed">{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
