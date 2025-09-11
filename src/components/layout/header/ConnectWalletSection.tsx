'use client';
import { Button } from 'shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/popover';
import { useModalFunction } from 'src/states/modal/modal';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { formatAddress } from 'src/utils/format';
import ModalConnectWallet from './ModalConnectWallet';
import { Copy, LoaderCircle } from 'lucide-react';
import { copyTextToClipboard } from 'src/utils';
import Image from 'next/image';

export default function ConnectWalletSection() {
    const { address, status, walletIcon, walletName, disconnect } = useSummarySolanaConnect();
    const { openModal, closeModal } = useModalFunction();
    return (
        <>
            {status === 'Connected' ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>
                            <Image src={walletIcon} alt={walletName} width={24} height={24} />
                            {formatAddress(address)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            {formatAddress(address)}
                            <Copy
                                className="w-4 h-4"
                                onClick={() =>
                                    copyTextToClipboard(address, {
                                        autoClose: 1000,
                                        position: 'top-right',
                                    })
                                }
                            />
                        </div>
                        <Button onClick={disconnect}>Disconnect</Button>
                    </PopoverContent>
                </Popover>
            ) : (
                <Button className="min-w-36" onClick={() => openModal({ title: 'Connect Wallet', content: <ModalConnectWallet onClose={closeModal} /> })}>
                    {status === 'Connecting' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : 'Connect Wallet'}
                </Button>
            )}
        </>
    );
}
