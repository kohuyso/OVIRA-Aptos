export type TWalletStatus = 'Connected' | 'Disconnected' | 'Connecting' | 'Loading' | 'Disconnecting' | 'NotFound' | 'NotInstalled' | 'NotExist' | 'Rejected' | 'Error';

export type TAptosId = '1' | '56';
export type TAppChainId = TAptosId;

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
