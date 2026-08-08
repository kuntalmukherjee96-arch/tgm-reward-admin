// 📈 SPRINT 12: EXECUTIVE BI & FORECASTING (UPDATED FOR FREEZE)
// Added Forecast Confidence Scoring Algorithm

class BIForecastingService {
    constructor(dbReadOnlyReplica) {
        this.db = dbReadOnlyReplica;
        this.cache = {}; 
    }

    async generateLiquidityForecast(daysToPredict = 30) {
        console.log(`[BI ENGINE] Calculating projections and confidence score...`);
        
        const historicalData = { avgDailyRevenue: 1500, avgDailyWithdrawals: 400, growthRate: 1.05, dataVariance: 0.12 };
        const projectedRevenue = (historicalData.avgDailyRevenue * historicalData.growthRate) * daysToPredict;
        const projectedLiability = (historicalData.avgDailyWithdrawals * historicalData.growthRate) * daysToPredict;
        
        // Confidence Score Calculation (Lower variance and shorter prediction time = higher confidence)
        let confidenceScore = 100 - (historicalData.dataVariance * 100) - (daysToPredict * 0.5);
        confidenceScore = Math.max(Math.min(confidenceScore, 99), 50); // Cap between 50% and 99%

        const forecastReport = {
            timeframe: `${daysToPredict} Days`,
            grossRevenueProjection: projectedRevenue.toFixed(2),
            liquidityReserveRequired: projectedLiability.toFixed(2),
            confidenceScore: `${confidenceScore.toFixed(1)}%`,
            generatedAt: new Date().toISOString()
        };

        this.cache['latest_forecast'] = forecastReport;
        console.log(`✅ [BI ENGINE] Forecast generated. Confidence: ${forecastReport.confidenceScore}`);
        return forecastReport;
    }
}

module.exports = BIForecastingService;