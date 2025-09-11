import { useWallet } from '@solana/wallet-adapter-react';
import { TSolanaNetworkId } from '../types';
import { SummaryConnectInfo } from '../../types';
import { CryptoIcon } from 'src/components/crypto-icons';

export default function useSummarySolanaConnect(): SummaryConnectInfo {
    const { publicKey, wallet, disconnect } = useWallet();

    return {
        address: publicKey?.toString() || '',
        chainId: TSolanaNetworkId.sol_devnet as string,
        chainIcon: <CryptoIcon name="SOL" />,
        chainName: 'Solana',
        status: wallet ? (wallet.adapter.connecting ? 'Connecting' : wallet.adapter.connected ? 'Connected' : 'Disconnected') : 'Disconnected',
        walletIcon: wallet?.adapter.icon || '',
        walletName: wallet?.adapter.name || '',
        accountName: '',
        disconnect: () => disconnect(),
    };
}
