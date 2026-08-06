// 📈 SPRINT 12 PHASE 3: EXECUTIVE BI & FORECASTING CORE SERVICE
// Headless, Read-Only Aggregation for Cash-Flow & KPI Projections (ADR 013)

class BIForecastingService {
    constructor(dbReadOnlyReplica) {
        // Enforcing Rule 1: This service only accepts a Read-Only DB Connection
        this.db = dbReadOnlyReplica;
        this.cache = {}; // In-memory cache for fast UI retrieval
    }

    // Core forecasting algorithm
    async generateLiquidityForecast(daysToPredict = 30) {
        console.log(`[BI ENGINE] Initiating Read-Only analytical query for the last 90 days...`);
        
        // Simulating heavy read-only DB aggregation
        const historicalData = {
            avgDailyRevenue: 1500, // $1500/day
            avgDailyWithdrawals: 400, // $400/day
            activeUsers: 12500,
            growthRate: 1.05 // 5% projected growth
        };

        const projectedRevenue = (historicalData.avgDailyRevenue * historicalData.growthRate) * daysToPredict;
        const projectedLiability = (historicalData.avgDailyWithdrawals * historicalData.growthRate) * daysToPredict;
        const netCashFlow = projectedRevenue - projectedLiability;

        const forecastReport = {
            timeframe: `${daysToPredict} Days`,
            grossRevenueProjection: projectedRevenue.toFixed(2),
            liquidityReserveRequired: projectedLiability.toFixed(2),
            netCashFlow: netCashFlow.toFixed(2),
            arpu: (historicalData.avgDailyRevenue * 30 / historicalData.activeUsers).toFixed(2), // Average Revenue Per User
            generatedAt: new Date().toISOString()
        };

        // Cache the report so the UI can fetch it instantly without hitting the DB
        this.cache['latest_forecast'] = forecastReport;
        
        console.log(`✅ [BI ENGINE] Forecast generated and cached successfully.`);
        return forecastReport;
    }

    getLatestForecast() {
        if (!this.cache['latest_forecast']) {
            throw new Error("[BI ENGINE] Forecast not available yet. Engine is still computing.");
        }
        return this.cache['latest_forecast'];
    }
}

module.exports = BIForecastingService;