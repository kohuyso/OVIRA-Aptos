import { Network } from '@aptos-labs/ts-sdk';
import { getDefaultStore } from 'jotai';
import { TAptosNetworkId } from './types';

export const jotaiAppStore = getDefaultStore();
export const aptosNetworkIds: Record<TAptosNetworkId, Network> = {
    aptos_devnet: Network.DEVNET,
    aptos_testnet: Network.TESTNET,
    aptos_mainnet: Network.MAINNET,
};

export const aptosNetworkSelect = aptosNetworkIds[TAptosNetworkId.aptos_devnet];

