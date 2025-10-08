import { Card, CardContent } from 'shadcn/card';
import TabCustom from 'src/components/customs/TabCustom';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import useQueryUserPosition from 'src/hooks/useQueryFarming/useQueryUserPosition';
import useQueryAllContractorVaults from 'src/hooks/useQueryFarming/useQueryAllContractorVaults';
import { useMemo } from 'react';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { getSelectedChain } from 'src/utils/chain';

export default function ActionPanel() {
    const { selectedVault } = useFarmingData();
    const { data: userBalance } = useQueryUserPosition();
    const { data: contractorVaultData } = useQueryAllContractorVaults();
    const selected = getSelectedChain();

    const vault_num = useMemo(() => {
        if (!contractorVaultData || !selectedVault.name) return undefined;
        const vault = contractorVaultData.find((v) => v.vault_address === selectedVault.address);
        return vault ? vault.vault_id : undefined;
    }, [contractorVaultData, selectedVault.address, selectedVault.name]);
    return (
        <Card>
            <CardContent>
                <TabCustom
                    height={44}
                    tabs={[
                        { value: 'deposit', label: 'Deposit', content: <Deposit maxAmount={userBalance?.usdc_balance} vault_num={vault_num} />, comingSoon: selected === 'solana' ? true : false },
                        { value: 'withdraw', label: 'Withdraw', content: <Withdraw maxAmount={1} vault_num={vault_num} />, comingSoon: selected === 'solana' ? true : false },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
