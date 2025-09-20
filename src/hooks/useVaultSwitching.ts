import { useEffect, useState } from 'react';
import { useFarmingData } from 'src/states/atoms/farming/farming';
import { useSearchParams } from 'next/navigation';

export default function useVaultSwitching() {
    const { selectedVault } = useFarmingData();
    const searchParams = useSearchParams();
    const selectedVaultName = searchParams.get('vaultId');

    const [isVaultSwitching, setIsVaultSwitching] = useState(false);
    const [previousVault, setPreviousVault] = useState<string>('');
    const [previousVaultParam, setPreviousVaultParam] = useState<string>('');

    useEffect(() => {
        // Check for vault name changes
        if (selectedVault.name && previousVault && selectedVault.name !== previousVault) {
            setIsVaultSwitching(true);

            // Simulate vault switching delay
            const timer = setTimeout(() => {
                setIsVaultSwitching(false);
            }, 1000); // 1 second delay for vault switching

            return () => clearTimeout(timer);
        }

        if (selectedVault.name) {
            setPreviousVault(selectedVault.name);
        }
    }, [selectedVault.name, previousVault]);

    useEffect(() => {
        // Check for URL parameter changes
        if (selectedVaultName && previousVaultParam && selectedVaultName !== previousVaultParam) {
            setIsVaultSwitching(true);

            // Simulate vault switching delay
            const timer = setTimeout(() => {
                setIsVaultSwitching(false);
            }, 1000); // 1 second delay for vault switching

            return () => clearTimeout(timer);
        }

        if (selectedVaultName) {
            setPreviousVaultParam(selectedVaultName);
        }
    }, [selectedVaultName, previousVaultParam]);

    return {
        isVaultSwitching,
        currentVault: selectedVault.name,
        previousVault,
        currentVaultParam: selectedVaultName,
        previousVaultParam,
    };
}
