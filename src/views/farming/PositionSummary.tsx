import { Card, CardContent, CardTitle } from 'shadcn/card';
import { CryptoIcon } from 'src/components/crypto-icons';
import useQueryNetValue from 'src/hooks/useQueryFarming/useQueryNetValue';
import useQueryEarnings from 'src/hooks/useQueryFarming/useQueryEarnings';
import { useFarmingData } from 'src/states/atoms/farming/farming';

export default function PositionSummary() {
    const { data: netValue, status: netValueStatus } = useQueryNetValue();
    const { data: earnings, status: earningsStatus } = useQueryEarnings();
    const { selectedVault } = useFarmingData();

    return (
        <Card>
            <CardContent>
                <CardTitle className="mb-4 text-base">Your position</CardTitle>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Net Value</span>
                        <span className="flex items-center gap-2">
                            <span className="font-semibold">{netValueStatus === 'success' ? netValue : '--'}</span>
                            <span className="text-muted-foreground flex items-center gap-1">
                                <CryptoIcon name={selectedVault.asset} size={20} /> {selectedVault.asset}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Earnings</span>
                        <span className="flex items-center gap-2">
                            <span className="font-semibold">{earningsStatus === 'success' ? earnings : '--'}</span>
                            <span className="text-muted-foreground flex items-center gap-1">
                                <CryptoIcon name={selectedVault.asset} size={20} /> {selectedVault.asset}
                            </span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
