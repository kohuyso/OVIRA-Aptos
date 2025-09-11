export type TWalletStatus = 'Connected' | 'Disconnected' | 'Connecting' | 'Loading' | 'Disconnecting' | 'NotFound' | 'NotInstalled' | 'NotExist' | 'Rejected' | 'Error';

export type TSolanaId = '1' | '56';
export type TAppChainId = TSolanaId;

export type SummaryConnectInfo = {
    chainId: string;
    chainName: string;
    chainIcon: React.ReactNode;
    address: string;
    accountName: string;
    status: TWalletStatus;
    walletName: string;
    walletIcon: string;
    disconnect: () => void;
};
