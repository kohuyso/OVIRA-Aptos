import React from 'react';
import ButtonToggleMode from '../../toggle-mode/ButtonToggleMode';
import { CryptoIcon } from '../../crypto-icons';
import ConnectWalletSection from './ConnectWalletSection';

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-background border-b px-6">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-1/2 h-full flex items-center justify-start">
                    <h1 className="text-2xl font-bold">OVIRA</h1>
                </div>
                <div className="w-1/2 h-full flex items-center justify-end gap-2">
                    <ButtonToggleMode />
                    <div className="border border-border rounded-md px-2 py-1 flex items-center gap-2">
                        <CryptoIcon name="SOL" size={20} />
                        <p>Solana</p>
                    </div>
                    <ConnectWalletSection />
                </div>
            </div>
        </div>
    );
}
