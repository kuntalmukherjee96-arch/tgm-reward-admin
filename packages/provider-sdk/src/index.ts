import { 
    IRewardProvider, 
    IProviderTaskConfig, 
    IProviderSession, 
    IProviderVerification, 
    IObservabilityContext 
} from '@reward-os/types';

export class AdsgramProvider implements IRewardProvider {
    readonly providerSlug = 'ad_adsgram';

    async startTask(userId: string, config: IProviderTaskConfig, ctx: IObservabilityContext): Promise<IProviderSession> {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        return {
            providerSessionId: `adsgram_${crypto.randomUUID()}`,
            token: `ag_token_${crypto.randomUUID().substring(0, 8)}`,
            expiresAt
        };
    }

    async verifyTask(providerSessionId: string, payload: any, ctx: IObservabilityContext): Promise<IProviderVerification> {
        return { isSuccess: true, fraudScore: 0 };
    }
}

export class AdMavenProvider implements IRewardProvider {
    readonly providerSlug = 'ad_admaven';

    async startTask(userId: string, config: IProviderTaskConfig, ctx: IObservabilityContext): Promise<IProviderSession> {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        const admavenBaseUrl = config.metadata.zoneLink || "https://admaven-smartlink-placeholder.com";
        const redirectUrl = `${admavenBaseUrl}?effect_id=${userId}&sub_id=${ctx.correlationId}`;
        return { providerSessionId: `admaven_${crypto.randomUUID()}`, redirectUrl, expiresAt };
    }

    async verifyTask(providerSessionId: string, payload: any, ctx: IObservabilityContext): Promise<IProviderVerification> {
        return { isSuccess: true, fraudScore: 0 };
    }
}