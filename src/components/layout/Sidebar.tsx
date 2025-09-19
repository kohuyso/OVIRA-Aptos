'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FarmingIcon, PersonalVaultIcon } from 'public/icons';

export type MenuItem = {
    label: string;
    href: string;
    icon?: React.ReactNode;
};

export const MENU_ITEMS: MenuItem[] = [
    { label: 'Farming', href: '/farming', icon: <FarmingIcon /> },
    { label: 'Personal Vault', href: '/personal-vault', icon: <PersonalVaultIcon /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r">
            <nav className="w-full h-full p-4 flex flex-col">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`mb-1 px-4 py-3 rounded-sm text-md transition-colors flex items-center gap-3 ${
                                isActive ? 'bg-secondary text-foreground font-semibold' : 'text-secondary-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
