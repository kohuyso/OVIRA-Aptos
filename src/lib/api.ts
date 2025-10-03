import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { TVault } from 'src/states/atoms/farming/farming';
import { NetworkName } from 'src/states/wallets/types';

export type SuccessResponse = {
    status_code: number;
    message: string;
};

export type CreateVaultSuccessResponse = SuccessResponse & {
    session_id: string;
};

export type PoolAllocation = {
    pool_name: string;
    weight_pct: number;
};

export type ReasoningTrace = {
    role: string;
    content: string;
    status: 'FINAL' | 'DRAFT' | 'FIXED' | 'APPROVED' | 'REJECTED' | 'NEEDS_CHANGES' | 'VERIFIED' | 'REJECTED';
};

export type AgentReasoning = {
    total_reasonings: number;
    reasonings: ReasoningTrace[];
};

export type PersonalVault = {
    vault_name: string;
    rank: number;
    apy: number;
    tvl: number;
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

export type VaultsStatistics = {
    total_tvls: number;
    num_creators: number;
};

export type VaultLeaderboardEntry = {
    vault_name: string;
    apy: number;
};

export type StepTransaction = {
    contract_address: string;
    function_name: string;
    module_name: string;
    inputs: Array<{ name: string; type: string; value: string | number }>;
    state_mutability: string;
    description: string;
};

export type UserPosition = {
    account: string;
    apt_balance: number;
    usdc_balance: number;
};

export type TransactionDataResponse = {
    steps: StepTransaction[];
    total_steps: number;
};

export type VaultDataType = {
    vault_id: number;
    vault_address: string;
    owner: string;
    apt_balance: number;
    token_balances: [
        {
            token_metadata: string;
            balance: number;
            balance_formatted: number;
        }
    ];
    total_value_apt: number;
};

export type VaultLeaderboards = Record<string, VaultLeaderboardEntry>;

export type PersonalVaults = Record<string, PersonalVault>;

let API_ROOT = 'http://131.153.202.197:8124';
const API_ROT_CONTRACTOR = 'http://131.153.239.187:8125';

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

function buildRequestContractorUrl(path: string): string {
    // On the browser, proxy via Next.js rewrites to avoid CORS
    if (typeof window !== 'undefined') {
        return `${API_ROT_CONTRACTOR}/v1/api${path}`;
    }
    // On the server, hit the upstream API directly (configurable via env)
    const root = API_ROT_CONTRACTOR;
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

async function requestContractorJson<T>(path: string, init?: RequestInit, query?: Record<string, unknown>): Promise<T> {
    const instance = getAxiosInstance();
    console.log('Requesting contractor API:', instance);

    const method = (init?.method || 'GET').toUpperCase();
    const config: AxiosRequestConfig = {
        url: buildRequestContractorUrl(path),
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
    vault_address: string;
    asset: Asset;
    risk_label: RiskLabel;
    chain: NetworkName;
    update_frequency?: number;
    policy_prompt?: string | null;
}): Promise<CreateVaultSuccessResponse> {
    return requestJson<CreateVaultSuccessResponse>('/vault/create_vault', { method: 'POST' }, params);
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

export async function getAllVaultsStatistics(): Promise<VaultsStatistics> {
    return requestJson<VaultsStatistics>('/vault/all_vault_statistics', { method: 'GET' });
}

export async function getVaultLeaderboards(): Promise<VaultLeaderboards> {
    return requestJson<VaultLeaderboards>('/vault/vault_leaderboards', { method: 'GET' });
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

export async function getPersonalVaults(user_wallet: string): Promise<PersonalVaults> {
    return requestJson<PersonalVaults>('/user/personal_vaults', { method: 'GET' }, { user_wallet });
}

// ---------------------- Transaction APIs ----------------------

export async function getAllVaultContractor(params: { user_address: string }): Promise<Array<VaultDataType>> {
    return requestContractorJson<Array<VaultDataType>>(`/contractor/contract/get_all_vaults/${params.user_address}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'your-api-key',
        },
    });
}

export async function getGetBalance(params: { user_address: string }): Promise<UserPosition> {
    return requestContractorJson<UserPosition>(`/contractor/contract/get_balance/${params.user_address}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'your-api-key',
        },
    });
}

export async function getCreateVaultTransaction(): Promise<TransactionDataResponse> {
    return requestContractorJson<TransactionDataResponse>('/contractor/contract/get_create_vault_steps', {
        method: 'GET',
        headers: {
            'X-API-KEY': 'your-api-key',
        },
    });
}

export async function getDepositToVault(params: { num_vault: number; token: string; amount: number }): Promise<TransactionDataResponse> {
    return requestContractorJson<TransactionDataResponse>(
        '/contractor/contract/get_deposit_steps',
        {
            method: 'GET',
            headers: {
                'X-API-KEY': 'your-api-key',
            },
        },
        params
    );
}

export async function getWithdrawFormVault(params: { num_vault: number; token: string; amount: number }): Promise<TransactionDataResponse> {
    return requestContractorJson<TransactionDataResponse>(
        '/contractor/contract/get_withdraw_steps',
        {
            method: 'GET',
            headers: {
                'X-API-KEY': 'your-api-key',
            },
        },
        params
    );
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

export async function getStrategyReasoning(params: { session_id: string }): Promise<AgentReasoning> {
    const { session_id } = params;
    return requestJson<AgentReasoning>(
        '/strategy/agent_reasoning',
        {
            method: 'GET',
        },
        { session_id }
    );
}

// ----------------------- Aptos Vault APIs ------------------------

export type AptosVaultCreationParams = {
    vault_name: string;
    owner_wallet_address: string;
    vault_asset_address: string;
    vault_share_token_name: string;
    vault_share_token_symbol: string;
    profit_max_unlock_time: number;
    management_fee: number;
    contract_address: string;
    module_name?: string;
};

export async function createAptosVault(params: AptosVaultCreationParams): Promise<SuccessResponse> {
    return requestJson<SuccessResponse>('/aptos/vault/create', { method: 'POST' }, params);
}

export async function getAptosVaultTransactionSteps(params: { vault_name: string; owner_wallet_address: string; contract_address: string; module_name?: string }): Promise<TransactionDataResponse> {
    return requestJson<TransactionDataResponse>('/aptos/vault/transaction_steps', { method: 'GET' }, params);
}
