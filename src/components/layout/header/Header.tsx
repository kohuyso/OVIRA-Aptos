'use client';
import React from 'react';
import ButtonToggleMode from '../../toggle-mode/ButtonToggleMode';
import { CryptoIcon } from '../../crypto-icons';
import ConnectWalletSection from './ConnectWalletSection';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from 'shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import Link from 'next/link';
import { MENU_ITEMS, MenuItem } from '../Sidebar';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function Header() {
    const { account, connected, wallet, changeNetwork, wallets } = useWallet();
    console.log('account', account);
    console.log('wallet', wallets);
    console.log('connected', connected);
    console.log('changeNetwork', changeNetwork);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-background border-b px-6">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-1/2 h-full flex items-center justify-start">
                    <h1 className="text-2xl font-bold">OVIRA</h1>
                </div>
                <div className="w-1/2 h-full flex items-center justify-end gap-2">
                    <ButtonToggleMode />
                    <ConnectWalletSection />
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="lg" variant="text" aria-label="Open menu">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {MENU_ITEMS.map((item: MenuItem) => (
                                    <Link key={item.href} href={item.href}>
                                        <DropdownMenuItem className="cursor-pointer">
                                            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                                            {item.label}
                                        </DropdownMenuItem>
                                    </Link>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}
