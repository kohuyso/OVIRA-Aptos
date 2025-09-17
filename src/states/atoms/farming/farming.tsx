'use client';
import { atom, useAtomValue, useSetAtom } from 'jotai';

export type TVault = {
    name: string;
    asset: string;
    risk_label: string;
    address: string;
    update_frequency: number | null;
};

export type TFarming = {
    listVaults: TVault[];
    selectedVault: TVault;
    selectedVaultName: string;
};

const initData: TFarming = {
    listVaults: [],
    selectedVault: {
        name: '',
        asset: '',
        risk_label: '',
        address: '',
        update_frequency: null,
    },
    selectedVaultName: '',
};

export const farmingData = atom<TFarming>(initData);

export const useFarmingData = () => useAtomValue(farmingData);

export const useFarmingFunction = () => {
    const _setFarmingData = useSetAtom(farmingData);

    function setListVaults(vaults: TVault[]) {
        _setFarmingData((prev) => ({
            ...prev,
            listVaults: vaults,
        }));
    }

    function setSelectedVault(vault: TVault) {
        _setFarmingData((prev) => ({
            ...prev,
            selectedVault: vault,
            selectedVaultName: vault.name,
        }));
    }

    return {
        setListVaults,
        setSelectedVault,
    };
};
