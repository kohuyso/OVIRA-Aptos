'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
    label: string;
    href: string;
};

const MENU_ITEMS: MenuItem[] = [{ label: 'Farming', href: '/farming' }];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r">
            <nav className="w-full h-full p-3 flex flex-col gap-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
