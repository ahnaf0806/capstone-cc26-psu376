import express from "express";

import {
  getAnalyticsData,
  getAnalyticsSummary,
  getStressAnalytics,
  getSleepQualityAnalytics,
  getCaffeineStressData,
  getSleepCaffeineData,
  getBMIHeartRateData,
  getHealthIssuesData,
  getOccupationStressData,
  getCountryConsumptionData,
  getHighRiskUsersData,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", getAnalyticsData);

router.get("/summary", getAnalyticsSummary);
router.get("/stress-distribution", getStressAnalytics);
router.get("/sleep-quality", getSleepQualityAnalytics);
router.get("/caffeine-stress", getCaffeineStressData);
router.get("/sleep-caffeine", getSleepCaffeineData);
router.get("/bmi-heart-rate", getBMIHeartRateData);
router.get("/health-issues", getHealthIssuesData);

router.get("/occupation-stress", getOccupationStressData);

router.get("/country-consumption", getCountryConsumptionData);

router.get("/high-risk-users", getHighRiskUsersData);
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Analytics API running",
  });
});

export default router;
