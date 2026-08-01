"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdMavenProvider = exports.AdsgramProvider = void 0;
class AdsgramProvider {
    providerSlug = 'ad_adsgram';
    async startTask(userId, config, ctx) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        return {
            providerSessionId: `adsgram_${crypto.randomUUID()}`,
            token: `ag_token_${crypto.randomUUID().substring(0, 8)}`,
            expiresAt
        };
    }
    async verifyTask(providerSessionId, payload, ctx) {
        return { isSuccess: true, fraudScore: 0 };
    }
}
exports.AdsgramProvider = AdsgramProvider;
class AdMavenProvider {
    providerSlug = 'ad_admaven';
    async startTask(userId, config, ctx) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        const admavenBaseUrl = config.metadata.zoneLink || "https://admaven-smartlink-placeholder.com";
        const redirectUrl = `${admavenBaseUrl}?effect_id=${userId}&sub_id=${ctx.correlationId}`;
        return { providerSessionId: `admaven_${crypto.randomUUID()}`, redirectUrl, expiresAt };
    }
    async verifyTask(providerSessionId, payload, ctx) {
        return { isSuccess: true, fraudScore: 0 };
    }
}
exports.AdMavenProvider = AdMavenProvider;
//# sourceMappingURL=index.js.map