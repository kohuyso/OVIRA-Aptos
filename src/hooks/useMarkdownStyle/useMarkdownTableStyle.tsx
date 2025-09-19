/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';

export default function useMarkdownTableStyle() {
    const tableStyle = useMemo(() => {
        return {
            h1: (props: any) => <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-foreground mb-4" {...props} />,
            h2: (props: any) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mt-6 mb-3" {...props} />,
            p: (props: any) => <p className="text-sm leading-7 text-foreground/90 mb-3" {...props} />,
            li: (props: any) => <li className="text-sm mb-1 pl-1 marker:text-muted-foreground text-foreground/90" {...props} />,

            table: (props: any) => (
                <div className="my-4 overflow-auto rounded-md border border-border">
                    <table className="w-full border-collapse my-2 border border-gray-200 dark:border-gray-800 text-sm" {...props} />
                </div>
            ),

            thead: (props: any) => <thead {...props} />,

            tbody: (props: any) => <tbody {...props} />,

            tr: (props: any) => <tr className="border-b last:border-b-0 border-border" {...props} />,

            th: (props: any) => <th className="text-sm px-3 py-2 bg-muted text-foreground/90 border border-border font-semibold text-left" {...props} />,

            td: (props: any) => <td className="text-sm px-3 py-2 border border-border text-foreground/80" {...props} />,

            a: (props: any) => <a className="text-primary hover:text-primary/90 underline underline-offset-4 font-medium" target="_blank" {...props} />,
        };
    }, []);
    return { tableStyle };
}
