'use client';

import Image from 'next/image';
import { Button } from 'shadcn/button';
import { PersonalVault } from 'src/lib/api';
import { formatNumber } from 'src/utils/format';

type PersonalVaultCardProps = {
    vault: PersonalVault;
    index?: number;
};

export default function PersonalVaultCard({ vault, index = 0 }: PersonalVaultCardProps) {
    return (
        <div key={vault.vault_name} className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image fill alt={vault.vault_name} src={vault.avatar_url ?? ''} className="object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{vault.vault_name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{vault.owner_wallet_address}</span>
                </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-end gap-1 rounded-2xl border py-1.5 px-2.5">
                    <span className="">APY</span>
                    <span className="">{formatNumber(vault.apy ?? 0, { suffix: '%', fractionDigits: 1 })}</span>
                </div>
                <div className="flex items-end gap-1 rounded-2xl border py-1.5 px-2.5">
                    <span className="">TVL</span>
                    <span className="">{formatNumber(vault.tvl ?? 0, { prefix: '$', fractionDigits: 0 })}</span>
                </div>
                <div className="flex items-end gap-1 rounded-2xl border py-1.5 px-2.5">
                    <span className="">Rank</span>
                    <span className="">{vault.rank ?? index + 1}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="border-primary bg-amber-300 py-4.5 text-[14px]">
                    View
                </Button>
                <Button className="text-[14px]">Deposit</Button>
            </div>
        </div>
    );
}
