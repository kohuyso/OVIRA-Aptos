'use client';
import { Card, CardContent } from 'shadcn/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { ChevronDown, LoaderCircle } from 'lucide-react';
import VaultAvt from 'src/components/customs/VaultAvt';
import { useFarmingData, useFarmingFunction } from 'src/states/atoms/farming/farming';
import useQueryListVaults from 'src/hooks/useQueryFarming/useQueryListVaults';

export default function TokenSection() {
    const { selectedVault, listVaults } = useFarmingData();
    const { status: listVaultsStatus } = useQueryListVaults();
    const { setSelectedVault } = useFarmingFunction();

    return (
        <Card>
            <CardContent>
                <div className="flex items-center gap-4">
                    {listVaultsStatus === 'success' ? (
                        <VaultAvt token={selectedVault.asset} chain={'SOL'} sizeToken={44} sizeChain={24} />
                    ) : (
                        <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
                    )}
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                                <h3>{listVaultsStatus === 'success' ? selectedVault.name : '--'}</h3>
                                <ChevronDown className="size-6" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64">
                                {listVaults.map((vault, index) => (
                                    <DropdownMenuItem key={index} selected={selectedVault === vault} onSelect={() => setSelectedVault(vault)}>
                                        <VaultAvt size="small" token={vault.asset} chain={'SOL'} sizeToken={32} sizeChain={13} />
                                        <p>{vault.name}</p>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <p className="text-xs text-secondary-foreground leading-none">Conservative product vault (stablecoins & blue-chip lending).</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
