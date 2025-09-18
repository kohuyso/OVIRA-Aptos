'use client';

import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { PersonalVault } from 'src/lib/api';
import PersonalVaultCard from './PersonalVaultCard';
import { CardTitle } from 'shadcn/card';

export default function PersonalVaults() {
    useSummarySolanaConnect();
    // const { data: personalListVault, isLoading } = useFetchPersonalVaults(address);
    const isLoading = false;
    const personalListVault: Array<PersonalVault> = [
        {
            apy: 5.2,
            tvl: 12000,
            avatar_url: 'https://solana.com/src/img/branding/solanaLogoMark.svg',
            owner_wallet_address: '0x123...abc',
            rank: 1,
            vault_name: 'Vault 1',
        },
        {
            apy: 8.5,
            tvl: 25000,
            avatar_url: 'https://solana.com/src/img/branding/solanaLogoMark.svg',
            owner_wallet_address: '0x456...def',
            rank: 2,
            vault_name: 'Vault 2',
        },
    ];

    return (
        <div className="bg-card flex flex-col gap-2 p-4 rounded-xs">
            <div className="flex flex-col gap-1">
                <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">Personal Vaults</CardTitle>
            </div>
            <div className="flex flex-col gap-2">
                {isLoading && <span className="text-muted-foreground">Loading...</span>}
                {/* {!isLoading && (!data || data.length === 0) && <span className="text-muted-foreground">No vaults found</span>} */}
                {!isLoading && personalListVault && personalListVault.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {personalListVault.map((vault) => (
                            <PersonalVaultCard vault={vault} key={vault.vault_name} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
