'use client';
import React, { useState } from 'react';
import { Button } from 'shadcn/button';
import { Wallet } from 'lucide-react';
import { CryptoIcon } from 'src/components/crypto-icons';
import { formatNumber } from 'src/utils/format';
import { regexConfigValue } from 'src/utils';

export default function Withdraw() {
    const [amount, setAmount] = useState('0');

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = regexConfigValue(e.target.value);
        setAmount(value);
    }
    return (
        <>
            <div className="flex flex-col gap-2 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground">Amount</div>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Wallet className="size-4" />
                            <span>0 USDC</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button size="xs" variant="outline">
                                HALF
                            </Button>
                            <Button size="xs" variant="outline">
                                MAX
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <input style={{ fontSize: '24px', fontWeight: '700', maxWidth: '220px' }} className="outline-none" value={amount} onChange={handleAmountChange} />
                    <div className="flex items-center bg-popover gap-1 px-2 py-1.5" style={{ borderRadius: '16px' }}>
                        <CryptoIcon name="USDC" size={20} />
                        <span className="text-sm">USDC</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground leading-none">≈ ${formatNumber(Number(amount) * 1.000001)} USD</div>
            </div>
            <div className="mt-5">
                <Button className="w-full" size="lg">
                    Withdraw
                </Button>
            </div>
        </>
    );
}
