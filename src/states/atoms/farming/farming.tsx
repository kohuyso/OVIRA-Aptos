'use client';
import { atom, useAtomValue, useSetAtom } from 'jotai';

export type TFarming = {
    listVaults: string[];
    selectedVault: string;
};

const initData: TFarming = {
    listVaults: [],
    selectedVault: '',
};

export const farmingData = atom<TFarming>(initData);

export const useFarmingData = () => useAtomValue(farmingData);

export const useFarmingFunction = () => {
    const _setFarmingData = useSetAtom(farmingData);

    function setListVaults(vaults: string[]) {
        _setFarmingData((prev) => ({
            ...prev,
            listVaults: vaults,
        }));
    }

    function setSelectedVault(vault: string) {
        _setFarmingData((prev) => ({
            ...prev,
            selectedVault: vault,
        }));
    }

    return {
        setListVaults,
        setSelectedVault,
    };
};
