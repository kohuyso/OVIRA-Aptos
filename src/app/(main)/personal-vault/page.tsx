'use client';

import AdditionalInfoBoard from 'src/views/personal-vault/AdditionalInfoBoard';
import CreateVaultForm from 'src/views/personal-vault/CreateVaultForm';
import PersonalVaults from 'src/views/personal-vault/PersonalVaults';

export default function Page() {
    return (
        <div className="flex flex-col">
            <div className="grid gap-2 lg:grid-cols-[1fr_384px]">
                <div className="flex flex-col gap-2">
                    <CreateVaultForm />
                    <PersonalVaults />
                </div>
                <div className="flex flex-col gap-2">
                    <AdditionalInfoBoard />
                </div>
            </div>
        </div>
    );
}
