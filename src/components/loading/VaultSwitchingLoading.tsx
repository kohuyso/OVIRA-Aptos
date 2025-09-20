import { Card, CardContent } from 'shadcn/card';
import { RefreshCw } from 'lucide-react';

interface VaultSwitchingLoadingProps {
    vaultName?: string;
}

export default function VaultSwitchingLoading({ vaultName }: VaultSwitchingLoadingProps) {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-center gap-3 py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <div className="text-center">
                        <p className="text-sm font-medium">Switching vault</p>
                        {vaultName && <p className="text-xs text-muted-foreground">Loading {vaultName}...</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
