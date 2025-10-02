import { ReactNode } from 'react';

interface LoadingWrapperProps {
    isLoading: boolean;
    loadingComponent: ReactNode;
    children: ReactNode;
}

export default function LoadingWrapper({ isLoading, loadingComponent, children }: LoadingWrapperProps) {
    return isLoading ? <>{loadingComponent}</> : <>{children}</>;
}

