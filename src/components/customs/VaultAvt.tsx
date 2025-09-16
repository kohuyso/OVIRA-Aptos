import { CryptoIcon } from '../crypto-icons';

export default function VaultAvt({ size, token, chain, sizeToken, sizeChain }: { size?: 'small' | 'medium' | 'large'; token: string; chain: string; sizeToken?: number; sizeChain?: number }) {
    return (
        <div className="relative">
            <div>
                <CryptoIcon name={token} size={sizeToken ?? 44} />
            </div>
            <div className={`absolute ${size === 'small' ? '-bottom-0.5 -right-0.5' : size === 'medium' ? '-bottom-0.7 -right-0.7' : '-bottom-1 -right-1'}`}>
                <CryptoIcon name={chain} size={sizeChain ?? 24} />
            </div>
        </div>
    );
}
