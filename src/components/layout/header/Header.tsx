'use client';
import React from 'react';
import ButtonToggleMode from '../../toggle-mode/ButtonToggleMode';
import { CryptoIcon } from '../../crypto-icons';
import ConnectWalletSection from './ConnectWalletSection';
import { ChevronDown } from 'lucide-react';
import { Button } from 'shadcn/button';

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-background border-b px-6">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-1/2 h-full flex items-center justify-start">
                    <h1 className="text-2xl font-bold">OVIRA</h1>
                </div>
                <div className="w-1/2 h-full flex items-center justify-end gap-2">
                    <ButtonToggleMode />
                    <Button size="lg" variant="text">
                        <CryptoIcon name="SOL" size={20} />
                        <p>Solana</p>
                        <ChevronDown className="w-5 h-5" />
                    </Button>
                    <ConnectWalletSection />
                </div>
            </div>
        </div>
    );
}
