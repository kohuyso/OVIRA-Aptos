import { Card, CardContent, CardTitle } from 'shadcn/card';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useQueryReasoningTrace from 'src/hooks/useQueryFarming/useQueryReasoningTrace';
import StatusCheckQuery from 'src/components/status/StatusCheckQuery';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useMarkdownTableStyle from 'src/hooks/useMarkdownStyle/useMarkdownTableStyle';
import { capitalizeFirstLetter } from 'src/utils/format';
import clsx from 'clsx';

const statusColors: Record<string, string> = {
    FINAL: 'text-blue-600',
    DRAFT: 'text-yellow-400',
    FIXED: 'text-green-500',
    APPROVED: 'text-green-600',
    REJECTED: 'text-red-600',
    NEEDS_CHANGES: 'text-orange-600',
    VERIFIED: 'text-purple-600',
};

safelist: ['text-blue-600', 'text-yellow-400', 'text-green-500', 'text-green-600', 'text-red-600', 'text-orange-600', 'text-purple-600'];

export default function ReasoningTrace() {
    const { data: traces, status } = useQueryReasoningTrace();
    const { tableStyle } = useMarkdownTableStyle();
    const tracesContainerRef = useRef<HTMLDivElement | null>(null);

    console.log('traces', traces);

    useEffect(() => {
        const container = tracesContainerRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
    }, [traces]);

    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">AI Reasoning Trace</CardTitle>
                {status !== 'success' || (traces && traces.length === 0) ? (
                    <div style={{ height: '300px' }} className="flex items-center justify-center">
                        <StatusCheckQuery status={status} noData={Boolean(traces?.length == 0)} />
                    </div>
                ) : (
                    <div style={{ height: '300px' }} className="grid grid-cols-[120px_1fr]">
                        <div className="overflow-y-auto border-r border-t">
                            <div className="flex flex-col">
                                {[...new Set(traces.map((t) => t.role))].map((role) => (
                                    <div key={role} className="flex items-center gap-3 py-2">
                                        <Image src={`/imgs/ai-agent/${role}.png`} alt={role} width={32} height={32} className="rounded-full" />
                                        <div className="text-sm font-medium capitalize">{role}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div ref={tracesContainerRef} className="h-full overflow-y-auto border-t">
                            <div className="flex flex-col gap-4 p-3 pr-20">
                                {traces.map((item, idx) => (
                                    <div key={`${item.role}-${idx}`} className="flex items-end gap-3">
                                        <Image src={`/imgs/ai-agent/${item.role}.png`} alt={item.role} width={40} height={40} className="rounded-full flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="bg-popover px-3 py-2 rounded-md">
                                                <div className="flex items-center mb-1">
                                                    <span className="text-md font-semibold text-foreground capitalize mt-0">{item.role}</span>
                                                    {item.status && (
                                                        <p
                                                            className={clsx(
                                                                'text-xs mt-0.5 font-medium ml-2',
                                                                item.status === 'FINAL' && 'text-blue-600',
                                                                item.status === 'DRAFT' && 'text-yellow-400',
                                                                item.status === 'FIXED' && 'text-green-500',
                                                                item.status === 'APPROVED' && 'text-green-600',
                                                                item.status === 'REJECTED' && 'text-red-600',
                                                                item.status === 'NEEDS_CHANGES' && 'text-orange-600',
                                                                item.status === 'VERIFIED' && 'text-purple-600'
                                                            )}
                                                        >
                                                            {capitalizeFirstLetter(item.status)}
                                                        </p>
                                                    )}
                                                </div>
                                                {/* <p className="text-xs text-foreground leading-relaxed">{item.content}</p> */}
                                                <Markdown remarkPlugins={[remarkGfm]} components={tableStyle}>
                                                    {item.content}
                                                </Markdown>
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
