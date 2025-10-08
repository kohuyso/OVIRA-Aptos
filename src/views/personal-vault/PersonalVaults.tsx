'use client';

import PersonalVaultCard from './PersonalVaultCard';
import { CardTitle } from 'shadcn/card';
import useFetchPersonalVaults from 'src/hooks/usePersonalVaults/useFetchPersonalVaults';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

export default function PersonalVaults() {
    const { address } = useSummaryConnect();
    console.log('address111', address);

    const { data: personalListVault, isLoading } = useFetchPersonalVaults(address);
    // const personalListVault: Array<PersonalVault> = [
    //     {
    //         apy: 5.2,
    //         tvl: 12000,
    //         rank: 1,
    //         vault_name: 'Vault 1',
    //     },
    //     {
    //         apy: 8.5,
    //         tvl: 25000,
    //         rank: 2,
    //         vault_name: 'Vault 2',
    //     },
    // ];

    return (
        <div className="bg-card flex flex-col gap-2 p-4 rounded-xs">
            <div className="flex flex-col gap-1">
                <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">Personal Vaults</CardTitle>
            </div>
            <div className="flex flex-col gap-2">
                {isLoading && (
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div key={idx} className="flex items-center justify-between rounded-md border p-3 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted" />
                                    <div className="flex flex-col gap-1">
                                        <span className="h-4 w-32 rounded bg-muted" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span className="h-6 w-20 rounded-2xl bg-muted" />
                                    <span className="h-6 w-20 rounded-2xl bg-muted" />
                                    <span className="h-6 w-16 rounded-2xl bg-muted" />
                                </div>
                                <div className="flex gap-2">
                                    <span className="h-9 w-20 rounded bg-muted" />
                                    <span className="h-9 w-24 rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && personalListVault && Object.values(personalListVault).length > 0 && (
                    <div className="flex flex-col gap-2">
                        {Object.values(personalListVault).map((vault) => (
                            <PersonalVaultCard vault={vault} key={vault.vault_name} />
                        ))}
                    </div>
                )}

                {!isLoading && (!personalListVault || Object.values(personalListVault).length === 0) && <span className="text-muted-foreground">No vaults found</span>}
            </div>
        </div>
    );
}
