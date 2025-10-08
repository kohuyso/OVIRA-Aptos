import { LoaderCircle, RefreshCw } from 'lucide-react';
import { Card } from 'shadcn/card';

interface LoadingStateIndicatorProps {
    type?: 'default' | 'vault-switching' | 'data-loading';
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function LoadingStateIndicator({ type = 'default', message, size = 'md' }: LoadingStateIndicatorProps) {
    const getIcon = () => {
        switch (type) {
            case 'vault-switching':
                return <RefreshCw className={`animate-spin text-primary ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />;
            case 'data-loading':
                return <LoaderCircle className={`animate-spin text-primary ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />;
            default:
                return <LoaderCircle className={`animate-spin text-primary ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />;
        }
    };

    const getDefaultMessage = () => {
        switch (type) {
            case 'vault-switching':
                return 'Switching vault...';
            case 'data-loading':
                return 'Loading data...';
            default:
                return 'Loading...';
        }
    };

    return (
        <Card className="p-4 flex items-center gap-3">
            {getIcon()}
            <span className={`font-medium ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>{message || getDefaultMessage()}</span>
        </Card>
    );
}

