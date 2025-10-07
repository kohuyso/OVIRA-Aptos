/**
 * Chain utility functions for multi-chain support
 */

export type ChainType = 'aptos' | 'solana';

/**
 * Get the selected chain from environment variables
 */
export function getSelectedChain(): ChainType {
    const value = (process.env.NEXT_PUBLIC_CHAIN || 'aptos').toLowerCase();
    return value === 'solana' ? 'solana' : 'aptos';
}

/**
 * Get the default RPC endpoint for the selected chain
 */
export function getDefaultRpcEndpoint(chain?: ChainType): string {
    const selectedChain = chain || getSelectedChain();

    switch (selectedChain) {
        case 'solana':
            return process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
        case 'aptos':
            return 'https://mainnet.aptoslabs.com/v1'; // Aptos mainnet
        default:
            return 'https://api.mainnet-beta.solana.com';
    }
}

/**
 * Get Solana RPC configuration, including optional HTTP headers from env.
 * Set NEXT_PUBLIC_SOLANA_HTTP_HEADERS to a JSON object string, e.g. {"Authorization":"Bearer ..."}
 */
export function getSolanaRpcConfig(): { endpoint: string; httpHeaders?: Record<string, string> } {
    const endpoint = getDefaultRpcEndpoint('solana');
    const headersRaw = process.env.NEXT_PUBLIC_SOLANA_HTTP_HEADERS || '';
    if (!headersRaw) return { endpoint };
    try {
        const httpHeaders = JSON.parse(headersRaw) as Record<string, string>;
        return { endpoint, httpHeaders };
    } catch {
        return { endpoint };
    }
}

/**
 * Parse fallback endpoints from env var. Comma-separated list.
 * Example: NEXT_PUBLIC_SOLANA_RPC_FALLBACKS="https://rpc1,https://rpc2"
 */
export function getSolanaFallbackEndpoints(): string[] {
    const raw = process.env.NEXT_PUBLIC_SOLANA_RPC_FALLBACKS || '';
    return raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}

/**
 * Check if the current chain is Solana
 */
export function isSolana(): boolean {
    return getSelectedChain() === 'solana';
}

/**
 * Check if the current chain is Aptos
 */
export function isAptos(): boolean {
    return getSelectedChain() === 'aptos';
}

/**
 * Get chain-specific configuration
 */
export function getChainConfig() {
    const chain = getSelectedChain();

    return {
        chain,
        rpcEndpoint: getDefaultRpcEndpoint(chain),
        isSolana: chain === 'solana',
        isAptos: chain === 'aptos',
    };
}

/**
 * Get a Connection factory that automatically falls back through configured endpoints
 * when encountering 403/forbidden blockhash access.
 */
export function getSolanaConnectionFactory() {
    const { endpoint, httpHeaders } = getSolanaRpcConfig();
    const fallbacks = getSolanaFallbackEndpoints();
    const endpoints = [endpoint, ...fallbacks, 'https://api.mainnet-beta.solana.com'];

    return {
        endpoints,
        httpHeaders,
    };
}
