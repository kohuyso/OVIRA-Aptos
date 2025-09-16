'use client';
import React, { useState } from 'react';
import { Tabs, TabsTrigger, TabsList } from 'shadcn/tabs';
import { cn } from 'src/lib/utils';

type TabItem = {
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
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
                        className={cn('relative z-10 h-full flex-1 rounded-md text-sm font-medium', 'border-0 data-[state=active]:text-accent-foreground', triggerClassName)}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <div className={cn('mt-2', contentClassName)}>{tabs.find((t) => t.value === currentValue)?.content}</div>
        </Tabs>
    );
}
