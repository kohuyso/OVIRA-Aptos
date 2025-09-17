'use client';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Button } from 'shadcn/button';
import { useState } from 'react';

interface IProps {
    onClose: () => void;
}

export default function ModalConnectWallet({ onClose }: IProps) {
    const { disconnect, select, wallet, wallets } = useWallet();
    const [connecting, setConnecting] = useState<string | null>(null);

    async function handleConnect(adapter: Adapter) {
        try {
            setConnecting(adapter.name);
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
        } finally {
            setConnecting(null);
        }
    }
    return (
        <>
            {wallets.map((wallet, index) => {
                const isThisConnecting = connecting === wallet.adapter.name;
                const isDisabled = Boolean(connecting) && !isThisConnecting;
                return (
                    <Button
                        key={wallet.adapter.name + index}
                        onClick={() => handleConnect(wallet.adapter)}
                        variant="outline"
                        disabled={isDisabled}
                        className="group w-full flex items-center justify-between gap-3 rounded-xl border bg-card/60 hover:bg-secondary transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed px-3 py-4.5"
                    >
                        <span className="flex items-center gap-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                                <Image src={wallet.adapter.icon} alt={wallet.adapter.name} width={20} height={20} />
                            </span>
                            <span className="flex flex-col text-left">
                                <span className="text-sm font-medium leading-none">{wallet.adapter.name}</span>
                            </span>
                        </span>
                        <span className="inline-flex items-center gap-2">
                            {isThisConnecting && (
                                <svg className="h-4 w-4 animate-spin text-primary" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            <svg
                                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </span>
                    </Button>
                );
            })}
        </>
    );
}
