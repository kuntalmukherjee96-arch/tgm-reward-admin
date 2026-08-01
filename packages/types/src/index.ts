export type PlatformType = 'telegram' | 'web' | 'android' | 'ios';
export type TaskStatus = 'started' | 'completed' | 'expired';
export type WithdrawStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface IObservabilityContext {
    requestId: string;
    traceId: string;
    correlationId: string;
    ipAddress: string;
    userAgent?: string;
}

export interface IProviderTaskConfig {
    taskId: string;
    taskType: string;
    metadata: Record<string, any>;
}

export interface IProviderSession {
    providerSessionId: string;
    redirectUrl?: string; 
    token?: string;
    expiresAt: Date;
}

export interface IProviderVerification {
    isSuccess: boolean;
    fraudScore?: number;
    errorMessage?: string;
}

/**
 * Universal Unified Network-Agnostic Interface
 */
export interface IRewardProvider {
    readonly providerSlug: string; 
    startTask(userId: string, config: IProviderTaskConfig, ctx: IObservabilityContext): Promise<IProviderSession>;
    verifyTask(providerSessionId: string, payload: any, ctx: IObservabilityContext): Promise<IProviderVerification>;
}