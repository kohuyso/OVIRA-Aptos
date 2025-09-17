'use client';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface IProps {
    onClose: () => void;
}

export default function ModalConnectWallet({ onClose }: IProps) {
    const { disconnect, select, wallet, wallets } = useWallet();

    async function handleConnect(adapter: Adapter) {
        try {
            if (wallet) {
                await disconnect();
                await wallet.adapter.disconnect();
            }
            await select(adapter.name);
            onClose();
            // await connect();
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message);
        }
    }
    return (
        <>
            {wallets.map((wallet, index) => (
                <div
                    key={wallet.adapter.name + index}
                    onClick={() => handleConnect(wallet.adapter)}
                    className="flex items-center gap-2 border border-border rounded-md p-2 cursor-pointer bg-card hover:bg-secondary"
                >
                    <Image src={wallet.adapter.icon} alt={wallet.adapter.name} width={24} height={24} />
                    {wallet.adapter.name}
                </div>
            ))}
        </>
    );
}
