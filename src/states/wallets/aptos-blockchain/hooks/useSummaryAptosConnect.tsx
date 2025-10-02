import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { TAptosNetworkId } from '../types';
import { SummaryConnectInfo } from '../../types';
import { CryptoIcon } from 'src/components/crypto-icons';

export default function useSummaryAptosConnect(): SummaryConnectInfo {
    const { account, wallet, disconnect } = useWallet();

    return {
        address: account?.address?.toString() || '',
        chainId: TAptosNetworkId.aptos_devnet as string,
        chainIcon: <CryptoIcon name="APT" />,
        chainName: 'Aptos',
        status: account ? 'Connected' : 'Disconnected',
        walletIcon: wallet?.icon || '',
        walletName: wallet?.name || '',
        accountName: account?.address?.toString() || '',
        disconnect: () => disconnect(),
    };
}
