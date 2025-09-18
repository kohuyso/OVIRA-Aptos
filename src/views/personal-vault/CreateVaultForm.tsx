'use client';
import { useState } from 'react';
import { Button } from 'shadcn/button';
import { CardTitle } from 'shadcn/card';
import DescriptionTextField from 'src/components/customs/DescriptionTextField';
import { SelectCustom, SelectItemType } from 'src/components/customs/SelectCustom';
import { scheduleDefault } from 'src/configs';
import { createVault } from 'src/lib/api';

export default function CreateVaultForm() {
    const [selectedStrategy, setSelectedStrategy] = useState<string>('');
    const [strategyDetails, setStrategyDetails] = useState<string>('');
    const [selectedSchedule, setSelectedSchedule] = useState<SelectItemType>(scheduleDefault[0]);

    const handleGenerateDraft = async () => {
        // Logic to generate draft based on the form inputs
        console.log('Generating draft with:', {
            selectedStrategy,
            strategyDetails,
            selectedSchedule,
        });
        const updateFrequencyInSeconds = selectedSchedule.value === 'daily' ? 24 * 60 * 60 : selectedSchedule.value === 'weekly' ? 7 * 24 * 60 * 60 : 30 * 24 * 60 * 60;

        await createVault({
            vault_name: selectedStrategy,
            owner_wallet_address: '0xYourWalletAddressHere',
            asset: 'USDC',
            risk_label: 'aggressive',
            update_frequency: updateFrequencyInSeconds,
            policy_prompt: strategyDetails,
        });
    };

    return (
        <div className="bg-card flex flex-col gap-2 p-4 rounded-xs">
            <div className="flex flex-col gap-1">
                <CardTitle className="text-foreground text-base font-semibold leading-[1.5] tracking-[-0.0125em]">Create Vault</CardTitle>
                <p className="text-muted-foreground">Describe the vault in natural tone. The OVIRA Agent will refine it and suggest it back for your confirmation.</p>
            </div>
            <div>
                <DescriptionTextField
                    text={selectedStrategy}
                    setText={setSelectedStrategy}
                    tittle="Pool Selection Strategy"
                    exampleDescription="E.g., choose stable pool have APY > 4, TVL >10, avoid token < 90 days old"
                />
            </div>
            <div>
                <DescriptionTextField
                    text={strategyDetails}
                    setText={setStrategyDetails}
                    tittle="Strategy Details"
                    exampleDescription="E.g., weekly rebalance, prioritize lending bluechip, decrease 10% allocation if volatility > 30%"
                />
            </div>
            <div className="flex gap-3">
                <div className="w-full">
                    <SelectCustom tittle="Schedule" selectedValue={selectedSchedule} setSelectedValue={setSelectedSchedule} selectionList={scheduleDefault} />
                </div>
                <div className="w-full mt-6">
                    <Button
                        className="w-full text-[14px]"
                        onClick={() => {
                            handleGenerateDraft();
                        }}
                    >
                        Generate draft
                    </Button>
                </div>
            </div>
        </div>
    );
}
