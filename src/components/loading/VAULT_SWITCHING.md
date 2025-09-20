# Vault Switching Loading System

This document explains how the vault switching loading system works and how to use it.

## Overview

The vault switching loading system provides visual feedback when users switch between different vaults in the farming interface. It detects vault changes through both state changes and URL parameter changes.

## Components

### 1. `useVaultSwitching` Hook

Detects when a vault switch is happening and manages the switching state.

```tsx
import useVaultSwitching from 'src/hooks/useVaultSwitching';

function MyComponent() {
    const { isVaultSwitching, currentVault, previousVault, currentVaultParam, previousVaultParam } = useVaultSwitching();

    return <div>{isVaultSwitching && <p>Switching vault...</p>}</div>;
}
```

**Returns:**

-   `isVaultSwitching`: Boolean indicating if vault is currently switching
-   `currentVault`: Current vault name from state
-   `previousVault`: Previous vault name from state
-   `currentVaultParam`: Current vault name from URL parameter
-   `previousVaultParam`: Previous vault name from URL parameter

### 2. `VaultSwitchingOverlay` Component

Shows an overlay with loading indicator when vault switching is active.

```tsx
import { VaultSwitchingOverlay } from 'src/components/loading';

<VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
    <YourComponent />
</VaultSwitchingOverlay>;
```

### 3. `VaultSwitchingLoading` Component

A dedicated loading component for vault switching.

```tsx
import { VaultSwitchingLoading } from 'src/components/loading';

<VaultSwitchingLoading vaultName="USDC Vault" />;
```

### 4. `LoadingStateIndicator` Component

A flexible loading indicator that can show different types of loading states.

```tsx
import { LoadingStateIndicator } from 'src/components/loading';

<LoadingStateIndicator type="vault-switching" message="Switching to USDC Vault..." size="md" />;
```

## Integration with Loading States

The vault switching state is integrated into the main loading states hook:

```tsx
import useFarmingLoadingStates from 'src/hooks/useFarmingLoadingStates';

function MyComponent() {
    const {
        isVaultSwitching,
        tokenSectionLoading,
        graphSectionLoading,
        // ... other loading states
    } = useFarmingLoadingStates();

    // All loading states now include vault switching
    // tokenSectionLoading = dataLoading || isVaultSwitching
}
```

## Usage Examples

### Basic Vault Switching Detection

```tsx
import useVaultSwitching from 'src/hooks/useVaultSwitching';

function VaultSelector() {
    const { isVaultSwitching } = useVaultSwitching();

    return (
        <div>
            <button disabled={isVaultSwitching}>Switch Vault</button>
            {isVaultSwitching && <p>Switching...</p>}
        </div>
    );
}
```

### Overlay on Content

```tsx
import { VaultSwitchingOverlay } from 'src/components/loading';

function DataSection() {
    const { isVaultSwitching } = useVaultSwitching();

    return (
        <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
            <div>
                {/* Your content here */}
                <Chart />
                <DataTable />
            </div>
        </VaultSwitchingOverlay>
    );
}
```

### Combined with Data Loading

```tsx
import { LoadingWrapper, VaultSwitchingOverlay } from 'src/components/loading';
import useFarmingLoadingStates from 'src/hooks/useFarmingLoadingStates';

function MyComponent() {
    const { isVaultSwitching, dataLoading } = useFarmingLoadingStates();

    return (
        <VaultSwitchingOverlay isVaultSwitching={isVaultSwitching}>
            <LoadingWrapper isLoading={dataLoading} loadingComponent={<DataLoading />}>
                <DataContent />
            </LoadingWrapper>
        </VaultSwitchingOverlay>
    );
}
```

## Configuration

### Switching Delay

The vault switching delay is configurable in the `useVaultSwitching` hook:

```tsx
// In useVaultSwitching.ts
const timer = setTimeout(() => {
    setIsVaultSwitching(false);
}, 1000); // 1 second delay - adjust as needed
```

### Detection Methods

The hook detects vault switching through:

1. **State Changes**: When `selectedVault.name` changes
2. **URL Parameter Changes**: When `vaultId` URL parameter changes

Both methods trigger the switching state independently.

## Best Practices

1. **Use Overlays for Content**: Wrap content sections with `VaultSwitchingOverlay` to prevent interaction during switching
2. **Disable Actions**: Disable buttons and interactive elements during vault switching
3. **Show Clear Feedback**: Use appropriate loading messages to inform users what's happening
4. **Combine with Data Loading**: Integrate vault switching with existing data loading states
5. **Test Both Methods**: Ensure switching works both through state changes and URL parameter changes

## Troubleshooting

### Vault Switching Not Detected

-   Check if the vault name is actually changing
-   Verify URL parameters are being updated
-   Ensure the hook is being called in the right component

### Overlay Not Showing

-   Verify `isVaultSwitching` is true
-   Check if the overlay component is properly wrapping content
-   Ensure CSS z-index is correct for the overlay

### Switching State Stuck

-   Check if the timeout is being cleared properly
-   Verify no other effects are interfering with the state
-   Look for infinite re-renders in the component
