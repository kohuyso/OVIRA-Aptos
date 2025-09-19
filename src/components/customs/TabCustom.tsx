'use client';
import React, { useState } from 'react';
import { Tabs, TabsTrigger, TabsList } from 'shadcn/tabs';
import { cn } from 'src/lib/utils';

type TabItem = {
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    comingSoon?: boolean;
    disabled?: boolean;
};

type TabCustomProps = {
    tabs: TabItem[];
    height?: number | string; // Height for TabsList
    value?: string; // Controlled value
    defaultValue?: string; // Uncontrolled initial value
    onValueChange?: (value: string) => void;
    className?: string; // Wrapper class
    listClassName?: string; // TabsList class
    triggerClassName?: string; // TabsTrigger class
    contentClassName?: string; // Slider wrapper class
};

export default function TabCustom({ tabs, height = 44, value, defaultValue, onValueChange, className, listClassName, triggerClassName, contentClassName }: TabCustomProps) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.value);

    const currentValue = isControlled ? value! : internalValue;

    const handleChange = (val: string) => {
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
    };

    const activeIndex = React.useMemo(() => {
        const idx = tabs.findIndex((t) => t.value === currentValue);
        return idx >= 0 ? idx : 0;
    }, [tabs, currentValue]);

    return (
        <Tabs value={currentValue} onValueChange={handleChange} className={cn('w-full', className)}>
            <TabsList className={cn('relative w-full bg-card border p-0 rounded-lg', listClassName)} style={{ height: typeof height === 'number' ? `${height}px` : height }}>
                <div
                    className="pointer-events-none absolute top-0 left-0 h-full border rounded-md bg-accent border-[var(--accent-border)] transition-transform duration-300 ease-in-out z-0"
                    style={{ width: `${100 / Math.max(1, tabs.length)}%`, transform: `translateX(${activeIndex * 100}%)` }}
                />

                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        disabled={tab.disabled || tab.comingSoon}
                        className={cn('relative z-10 h-full flex-1 rounded-md text-sm font-medium', 'border-0 data-[state=active]:text-accent-foreground', triggerClassName)}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {tab.label}
                            {tab.comingSoon && <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Soon</span>}
                        </span>
                    </TabsTrigger>
                ))}
            </TabsList>

            <div className={cn('mt-2 relative', contentClassName)}>
                <div className={cn(tabs.find((t) => t.value === currentValue)?.comingSoon && 'blur-sm pointer-events-none')}>{tabs.find((t) => t.value === currentValue)?.content}</div>
                {tabs.find((t) => t.value === currentValue)?.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground">Coming soon</span>
                    </div>
                )}
            </div>
        </Tabs>
    );
}
