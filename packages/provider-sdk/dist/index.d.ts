import { IRewardProvider, IProviderTaskConfig, IProviderSession, IProviderVerification, IObservabilityContext } from '@reward-os/types';
export declare class AdsgramProvider implements IRewardProvider {
    readonly providerSlug = "ad_adsgram";
    startTask(userId: string, config: IProviderTaskConfig, ctx: IObservabilityContext): Promise<IProviderSession>;
    verifyTask(providerSessionId: string, payload: any, ctx: IObservabilityContext): Promise<IProviderVerification>;
}
export declare class AdMavenProvider implements IRewardProvider {
    readonly providerSlug = "ad_admaven";
    startTask(userId: string, config: IProviderTaskConfig, ctx: IObservabilityContext): Promise<IProviderSession>;
    verifyTask(providerSessionId: string, payload: any, ctx: IObservabilityContext): Promise<IProviderVerification>;
}
