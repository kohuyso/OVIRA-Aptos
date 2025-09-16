'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
    label: string;
    href: string;
};

const MENU_ITEMS: MenuItem[] = [
    { label: 'Farming', href: '/farming' },
    { label: 'Personal Vault', href: '/personal-vault' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r">
            <nav className="w-full h-full p-4 flex flex-col">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-4 py-3 rounded-sm text-md transition-colors ${
                                isActive ? 'bg-secondary text-foreground font-semibold' : 'text-secondary-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
