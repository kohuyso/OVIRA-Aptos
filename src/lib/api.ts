import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { TVault } from 'src/states/atoms/farming/farming';

export type SuccessResponse = {
    status_code: number;
    message: string;
};

export type PoolAllocation = {
    pool_name: string;
    weight_pct: number;
};

export type ReasoningTrace = {
    role: string;
    content: string;
};

export type PersonalVault = {
    vault_name: string;
    owner_wallet_address: string;
    avatar_url: string | null;
    rank: number | null;
    apy: number | null;
    tvl: number | null;
};

export type VaultStrategyUpdatedInfo = {
    timestamp: string; // ISO datetime string
    action: string;
    details: string;
};

export type Asset = 'USDT' | 'USDC';
export type RiskLabel = 'conservative' | 'balanced' | 'aggressive';

export type Strategy = {
    risk_label: string;
    allocations: PoolAllocation[];
};

export type StrategyInfo = {
    strategy: Strategy;
    reasoning_trace: ReasoningTrace[];
};

let API_ROOT = 'http://131.153.239.187:8124';

/**
 * Optionally update the API root at runtime. Trailing slash is trimmed.
 */
export function setApiRoot(root: string) {
    API_ROOT = (root || '').replace(/\/$/, '');
}

let axiosInstance: AxiosInstance | null = null;

function getAxiosInstance(): AxiosInstance {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    return axiosInstance;
}

function buildRequestUrl(path: string): string {
    // On the browser, proxy via Next.js rewrites to avoid CORS
    if (typeof window !== 'undefined') {
        return `/api${path}`;
    }
    // On the server, hit the upstream API directly (configurable via env)
    const root = process.env.API_ROOT || API_ROOT;
    return `${root}${path}`;
}

async function requestJson<T>(path: string, init?: RequestInit, query?: Record<string, unknown>): Promise<T> {
    const instance = getAxiosInstance();
    const method = (init?.method || 'GET').toUpperCase();
    const config: AxiosRequestConfig = {
        url: buildRequestUrl(path),
        method: method as AxiosRequestConfig['method'],
        params: query,
        headers: init?.headers as Record<string, string> | undefined,
        // body handling below
    };

    if (init?.body) {
        try {
            config.data = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
        } catch {
            // if body is not JSON string, send as-is
            config.data = init.body as unknown as object;
        }
    }

    try {
        const res = await instance.request<T>(config);
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axErr = error as AxiosError;
            const status = axErr.response?.status;
            const data = axErr.response?.data as unknown;
            const msg = typeof data === 'string' ? data : data ? JSON.stringify(data) : axErr.message;
            throw new Error(`Request failed${status ? ` ${status}` : ''}: ${msg}`);
        }
        throw error as Error;
    }
}

// ------------------------- Vault APIs -------------------------

export async function createVault(params: {
    vault_name: string;
    owner_wallet_address: string;
    asset: Asset;
    risk_label: RiskLabel;
    update_frequency?: number;
    policy_prompt?: string | null;
}): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/vault/create_vault', { method: 'POST' }, params);
}

export async function updateVaultPolicy(params: { vault_name: string; new_update_frequency?: number | null; new_policy_prompt?: string | null }): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/vault/update_vault_policy', { method: 'POST' }, params);
}

export async function getVaultApy(vault_name: string): Promise<number> {
    return requestJson<number>('/vault/apy', { method: 'GET' }, { vault_name });
}

export async function getVaultTvl(vault_name: string): Promise<number> {
    return requestJson<number>('/vault/tvl', { method: 'GET' }, { vault_name });
}

export async function getApyChart(vault_name: string, days?: number): Promise<[string, number][]> {
    return requestJson<[string, number][]>('/vault/apy_chart', { method: 'GET' }, { vault_name, days });
}

export async function getTvlChart(vault_name: string, days?: number): Promise<[string, number][]> {
    return requestJson<[string, number][]>('/vault/tvl_chart', { method: 'GET' }, { vault_name, days });
}

export async function getVaultAllocations(vault_name: string): Promise<PoolAllocation[]> {
    return requestJson<PoolAllocation[]>('/vault/pools_allocations', { method: 'GET' }, { vault_name });
}

export async function getRecentActions(vault_name: string, days?: number): Promise<VaultStrategyUpdatedInfo[]> {
    return requestJson<VaultStrategyUpdatedInfo[]>('/vault/recent_action', { method: 'GET' }, { vault_name, days });
}

export async function getVaultReasoningTrace(vault_name: string): Promise<ReasoningTrace[]> {
    return requestJson<ReasoningTrace[]>('/vault/ai_reasoning_trace', { method: 'GET' }, { vault_name });
}

export async function getExistingVaults(): Promise<TVault[]> {
    return requestJson<TVault[]>('/vault/existing_vaults', { method: 'GET' });
}

// ------------------------- User APIs -------------------------

export async function createUser(user_wallet: string): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/user/create_user', { method: 'POST' }, { user_wallet });
}

export async function getUserBalanceNetValue(params: { user_wallet: string; vault_name: string }): Promise<number> {
    return requestJson<number>('/user/balance/net_value', { method: 'GET' }, params);
}

export async function getUserBalanceEarnings(params: { user_wallet: string; vault_name: string }): Promise<number> {
    return requestJson<number>('/user/balance/earnings', { method: 'GET' }, params);
}

// ---------------------- Transaction APIs ----------------------

export async function deposit(params: { vault_name: string; amount: number; user_wallet: string }): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/transaction/deposit', { method: 'POST' }, params);
}

export async function withdraw(params: { vault_name: string; amount: number; user_wallet: string }): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/transaction/withdraw', { method: 'POST' }, params);
}

// ----------------------- Strategy APIs ------------------------

export async function updateVaultStrategy(params: { vault_name: string; strategyInfo: StrategyInfo }): Promise<SuccessResponse> {
    const { vault_name, strategyInfo } = params;
    return requestJson<SuccessResponse>(
        '/strategy/update_vault_strategy',
        {
            method: 'POST',
            body: JSON.stringify(strategyInfo),
        },
        { vault_name }
    );
}
