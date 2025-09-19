'use client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button } from 'shadcn/button';
import { CardTitle } from 'shadcn/card';
import TextField from 'src/components/customs/DescriptionTextField';
import { SelectCustom, SelectItemType } from 'src/components/customs/SelectCustom';
import { riskLabelDefault, scheduleDefault } from 'src/configs';
import { createVault, RiskLabel } from 'src/lib/api';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

export default function CreateVaultForm() {
    const { address } = useSummarySolanaConnect();
    const queryClient = useQueryClient();

    const [vaultName, setVaultName] = useState<string>('');
    const [strategyDetails, setStrategyDetails] = useState<string>('');
    const [selectedSchedule, setSelectedSchedule] = useState<SelectItemType>(scheduleDefault[0]);
    const [selectedRiskLabel, setSelectedRiskLabel] = useState<SelectItemType>(riskLabelDefault[1]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleGenerateDraft = async () => {
        try {
            setIsSubmitting(true);
            console.log('Generating draft with:', {
                vaultName,
                strategyDetails,
                selectedSchedule,
            });
            const updateFrequencyInSeconds = selectedSchedule.value === 'daily' ? 24 : selectedSchedule.value === 'weekly' ? 7 * 24 : 30 * 24;

            if (!address) {
                console.log('No address found');
                toast.error('No address found');
                return;
            } else if (!vaultName) {
                console.log('Vault name is required');
                toast.error('Vault name is required');
                return;
            } else if (!strategyDetails) {
                console.log('Strategy details are required');
                toast.error('Strategy details are required');
                return;
            }

            // Call the createVault function from the API
            await createVault({
                vault_name: vaultName,
                owner_wallet_address: address,
                asset: 'USDC',
                risk_label: selectedRiskLabel.value as RiskLabel,
                update_frequency: updateFrequencyInSeconds,
                policy_prompt: strategyDetails,
            });

            toast.success('Vault draft created');

            // Reset form
            setVaultName('');
            setStrategyDetails('');
            setSelectedSchedule(scheduleDefault[0]);
            setSelectedRiskLabel(riskLabelDefault[1]);

            // Refresh personal vaults list
            await queryClient.invalidateQueries({ queryKey: ['useFetchPersonalVaults', address] });
        } catch (error) {
            console.log('Error generating draft:', error);
            toast.error('Failed to create vault draft');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-card flex flex-col gap-2 p-4 rounded-xs">
            <div className="flex flex-col gap-1">
                <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">Create Vault</CardTitle>
                <p className="text-muted-foreground">Describe the vault in natural tone. The OVIRA Agent will refine it and suggest it back for your confirmation.</p>
            </div>
            <div className="flex gap-3">
                <div className="w-1/2">
                    <TextField
                        text={vaultName}
                        setText={setVaultName}
                        tittle="Vault Name"
                        height="40px"
                        exampleDescription="E.g., weekly rebalance, prioritize lending bluechip, decrease 10% allocation if volatility > 30%"
                    />
                </div>
                <div className="w-1/2">
                    <SelectCustom tittle="Risk" selectedValue={selectedRiskLabel} setSelectedValue={setSelectedRiskLabel} selectionList={riskLabelDefault} height="40px" />
                </div>
            </div>
            <div>
                <TextField
                    type="textarea"
                    text={strategyDetails}
                    setText={setStrategyDetails}
                    tittle="Strategy Details"
                    exampleDescription="E.g., weekly rebalance, prioritize lending bluechip, decrease 10% allocation if volatility > 30%"
                />
            </div>
            <div className="flex gap-3">
                <div className="w-full">
                    <SelectCustom tittle="Schedule" selectedValue={selectedSchedule} setSelectedValue={setSelectedSchedule} selectionList={scheduleDefault} height="40px" />
                </div>
                <div className="w-full mt-7">
                    <Button
                        className="w-full text-[14px] h-10"
                        disabled={isSubmitting}
                        onClick={() => {
                            handleGenerateDraft();
                        }}
                    >
                        {isSubmitting && (
                            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        )}
                        {isSubmitting ? 'Generating…' : 'Generate'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
