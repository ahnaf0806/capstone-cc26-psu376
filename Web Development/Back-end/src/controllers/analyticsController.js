import {
  loadDataset,
  getSummaryStatistics,
  getStressDistribution,
  getSleepQualityDistribution,
  getCaffeineStressAnalytics,
  getSleepCaffeineAnalytics,
  getBMIHeartRateAnalytics,
  getHealthIssuesDistribution,
  getOccupationStressAnalytics,
  getCountryConsumptionAnalytics,
  getHighRiskUsers,
} from "../services/analyticsService.js";

export const getAnalyticsData = async (req, res) => {
  try {
    const data = await loadDataset();

    const limit = Number(req.query.limit) || 20;

    res.status(200).json({
      success: true,
      totalData: data.length,
      showing: limit,
      data: data.slice(0, limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await getSummaryStatistics();

    res.status(200).json({
      success: true,
      timestamp: new Date(),
      endpoint: "/api/analytics/summary",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStressAnalytics = async (req, res) => {
  try {
    const distribution = await getStressDistribution();

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSleepQualityAnalytics = async (req, res) => {
  try {
    const distribution = await getSleepQualityDistribution();

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getCaffeineStressData = async (req, res) => {
  try {
    const analytics = await getCaffeineStressAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getSleepCaffeineData = async (req, res) => {
  try {
    const analytics = await getSleepCaffeineAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBMIHeartRateData = async (req, res) => {
  try {
    const analytics = await getBMIHeartRateAnalytics();

    res.status(200).json({
      success: true,
      totalData: analytics.length,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHealthIssuesData = async (req, res) => {
  try {
    const analytics = await getHealthIssuesDistribution();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOccupationStressData = async (req, res) => {
  try {
    const analytics = await getOccupationStressAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCountryConsumptionData = async (req, res) => {
  try {
    const analytics = await getCountryConsumptionAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHighRiskUsersData = async (req, res) => {
  try {
    const analytics = await getHighRiskUsers();

    const limit = Number(req.query.limit) || 20;

    res.status(200).json({
      success: true,
      totalData: analytics.length,
      showing: limit,
      data: analytics.slice(0, limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
