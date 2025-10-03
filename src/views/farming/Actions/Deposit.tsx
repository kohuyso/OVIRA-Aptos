'use client';
import React, { useCallback, useState } from 'react';
import { Button } from 'shadcn/button';
import { Wallet, Loader2 } from 'lucide-react';
import { CryptoIcon } from 'src/components/crypto-icons';
import { formatNumber } from 'src/utils/format';
import { regexConfigValue } from 'src/utils';
import useDepositToVault from 'src/hooks/usePersonalVaults/useDepositToVault';

type DepositProps = {
    maxAmount?: number;
    vault_num?: number;
};

export default function Deposit({ maxAmount, vault_num }: DepositProps) {
    const { depositToVaultFn } = useDepositToVault();

    console.log('vault_num', vault_num);

    const [amount, setAmount] = useState('0');
    const [isDepositing, setIsDepositing] = useState(false);

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = regexConfigValue(e.target.value);
        // clamp to 6 decimal places if any
        const parts = value.split('.');
        if (parts.length === 2 && parts[1].length > 6) {
            setAmount(`${parts[0]}.${parts[1].slice(0, 6)}`);
        } else {
            setAmount(value);
        }
    }

    const handleDeposit = useCallback(async () => {
        const numericAmount = Number(amount) || 0;
        if (numericAmount <= 0) return;
        if (typeof maxAmount === 'number' && numericAmount > maxAmount) return;
        if (!vault_num) return;

        setIsDepositing(true);
        try {
            const result = await depositToVaultFn({ vault_num: 1, token: 'USDC', amount: numericAmount });
            if (result && Array.isArray(result)) {
                setAmount('0');
            }
        } finally {
            setIsDepositing(false);
        }
    }, [amount, depositToVaultFn, maxAmount, vault_num]);

    function toSix(n: number) {
        // Keep up to 6 decimals without unnecessary trailing zeros
        const fixed = n.toFixed(6);
        return fixed.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
    }

    function handleHalf() {
        if (typeof maxAmount !== 'number') return;
        const half = maxAmount / 2;
        setAmount(toSix(half));
    }

    function handleMax() {
        if (typeof maxAmount !== 'number') return;
        setAmount(toSix(maxAmount));
    }

    return (
        <>
            <div className="flex flex-col gap-2 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground">Amount</div>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Wallet className="size-4" />
                            <span>{typeof maxAmount === 'number' ? `${toSix(maxAmount)} USDC` : '0 USDC'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button size="xs" variant="outline" onClick={handleHalf} disabled={typeof maxAmount !== 'number' || maxAmount <= 0}>
                                HALF
                            </Button>
                            <Button size="xs" variant="outline" onClick={handleMax} disabled={typeof maxAmount !== 'number' || maxAmount <= 0}>
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
                {typeof maxAmount === 'number' && Number(amount) > maxAmount ? <div className="text-xs text-destructive">Amount exceeds available balance.</div> : null}
            </div>
            <div className="mt-5">
                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleDeposit}
                    disabled={!vault_num || isDepositing || Number(amount) <= 0 || (typeof maxAmount === 'number' && Number(amount) > maxAmount)}
                >
                    {isDepositing ? (
                        <span className="inline-flex items-center">
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Depositing...
                        </span>
                    ) : (
                        'Deposit'
                    )}
                </Button>
            </div>
        </>
    );
}
