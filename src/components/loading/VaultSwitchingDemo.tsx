import { Card, CardContent, CardTitle } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { useFarmingData, useFarmingFunction } from 'src/states/atoms/farming/farming';
import useVaultSwitching from 'src/hooks/useVaultSwitching';
import VaultSwitchingOverlay from './VaultSwitchingOverlay';
import VaultSwitchingLoading from './VaultSwitchingLoading';

export default function VaultSwitchingDemo() {
    const { listVaults, selectedVault } = useFarmingData();
    const { setSelectedVault } = useFarmingFunction();
    const { isVaultSwitching, currentVault, previousVault } = useVaultSwitching();

    return (
        <div className="space-y-4">
            <Card>
                <CardContent>
                    <CardTitle className="mb-4">Vault Switching Demo</CardTitle>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Current Vault: {currentVault}</p>
                            <p className="text-sm text-muted-foreground mb-2">Previous Vault: {previousVault}</p>
                            <p className="text-sm text-muted-foreground mb-4">Is Switching: {isVaultSwitching ? 'Yes' : 'No'}</p>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {listVaults.map((vault, index) => (
                                <Button key={index} variant={selectedVault.name === vault.name ? 'default' : 'outline'} size="sm" onClick={() => setSelectedVault(vault)} disabled={isVaultSwitching}>
                                    {vault.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
                <Card>
                    <CardContent>
                        <CardTitle className="mb-4">Content with Vault Switching Overlay</CardTitle>
                        <p className="text-sm text-muted-foreground">This content will be overlaid when switching vaults.</p>
                    </CardContent>
                </Card>
            </VaultSwitchingOverlay>

            {isVaultSwitching && <VaultSwitchingLoading vaultName={currentVault} />}
        </div>
    );
}
