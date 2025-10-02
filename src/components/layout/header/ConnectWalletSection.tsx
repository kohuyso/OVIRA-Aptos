'use client';
import { Button } from 'shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/popover';
import { useModalFunction } from 'src/states/modal/modal';
import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';
import { formatAddress } from 'src/utils/format';
import ModalConnectWallet from './ModalConnectWallet';
import { ChevronDown, Copy, LoaderCircle } from 'lucide-react';
import { copyTextToClipboard } from 'src/utils';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createUser } from 'src/lib/api';

export default function ConnectWalletSection() {
    const { address, status, walletIcon, walletName, disconnect } = useSummaryAptosConnect();
    const { openModal, closeModal } = useModalFunction();

    const createdAddressesRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (status === 'Connected' && address) {
            if (createdAddressesRef.current.has(address)) return;
            createdAddressesRef.current.add(address);
            createUser(address).catch((err) => {
                console.error('Failed to create user for wallet', address, err);
            });
        }
    }, [status, address]);
    return (
        <>
            {status === 'Connected' ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="lg" variant="text">
                            <Image src={walletIcon} alt={walletName} width={24} height={24} />
                            {formatAddress(address)}
                            <ChevronDown className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            {formatAddress(address)}
                            <Copy
                                className="w-5 h-5 cursor-pointer"
                                onClick={() =>
                                    copyTextToClipboard(address, {
                                        autoClose: 500,
                                        position: 'top-right',
                                    })
                                }
                            />
                        </div>
                        <Button onClick={disconnect}>Disconnect</Button>
                    </PopoverContent>
                </Popover>
            ) : status == 'Connecting' ? (
                <Button size="lg" className="min-w-36" disabled>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                    Connecting
                </Button>
            ) : (
                <Button size="lg" className="min-w-36" onClick={() => openModal({ title: 'Connect Wallet', content: <ModalConnectWallet onClose={closeModal} /> })}>
                    Connect Wallet
                </Button>
            )}
        </>
    );
}
