import { ReactNode } from 'react';
import { Card } from 'shadcn/card';
import { LoaderCircle } from 'lucide-react';

interface VaultSwitchingOverlayProps {
    children: ReactNode;
    isVaultSwitching: boolean;
}

export default function VaultSwitchingOverlay({ children, isVaultSwitching }: VaultSwitchingOverlayProps) {
    if (!isVaultSwitching) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            {children}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <Card className="p-4 flex items-center gap-3">
                    <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-sm font-medium">Switching vault...</span>
                </Card>
            </div>
        </div>
    );
}

