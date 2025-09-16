import { Card, CardContent, CardTitle } from 'shadcn/card';
import { CryptoIcon } from 'src/components/crypto-icons';

export default function PositionSummary() {
    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">Your position</CardTitle>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Net Value</span>
                        <span className="flex items-center gap-2">
                            <span className="font-semibold">3123.33</span>
                            <span className="text-muted-foreground flex items-center gap-1">
                                <CryptoIcon name="USDC" size={20} /> USDC
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Earnings</span>
                        <span className="flex items-center gap-2">
                            <span className="font-semibold">3123.33</span>
                            <span className="text-muted-foreground flex items-center gap-1">
                                <CryptoIcon name="USDC" size={20} /> USDC
                            </span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
