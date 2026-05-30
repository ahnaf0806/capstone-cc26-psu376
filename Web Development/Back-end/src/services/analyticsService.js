import fs from "fs";
import path from "path";
import csv from "csv-parser";

export const loadDataset = async () => {
  return new Promise((resolve, reject) => {
    const results = [];

    const datasetPath = path.resolve("src/ai/dataset/dataset_kopi_clean.csv");

    fs.createReadStream(datasetPath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const getSummaryStatistics = async () => {
  const data = await loadDataset();

  const totalUsers = data.length;

  const totalCoffee = data.reduce(
    (sum, item) => sum + Number(item.Coffee_Intake),
    0,
  );

  const totalSleep = data.reduce(
    (sum, item) => sum + Number(item.Sleep_Hours),
    0,
  );

  const highStressCount = data.filter(
    (item) => item.Stress_Level === "High",
  ).length;

  return {
    totalUsers,
    avgCoffeeIntake: Number(totalCoffee / totalUsers).toFixed(2),

    avgSleepHours: Number(totalSleep / totalUsers).toFixed(2),

    highStressPercentage: Number((highStressCount / totalUsers) * 100).toFixed(
      2,
    ),
  };
};

export const getStressDistribution = async () => {
  const data = await loadDataset();

  const distribution = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  data.forEach((item) => {
    const stress = item.Stress_Level;

    if (distribution[stress] !== undefined) {
      distribution[stress]++;
    }
  });

  return distribution;
};
export const getSleepQualityDistribution = async () => {
  const data = await loadDataset();

  const distribution = {};

  data.forEach((item) => {
    const sleep = item.Sleep_Quality;

    if (!distribution[sleep]) {
      distribution[sleep] = 0;
    }

    distribution[sleep]++;
  });

  return distribution;
};

export const getCaffeineStressAnalytics = async () => {
  const data = await loadDataset();

  const grouped = {};

  data.forEach((item) => {
    const stress = item.Stress_Level;

    if (!grouped[stress]) {
      grouped[stress] = {
        totalCoffee: 0,
        count: 0,
      };
    }

    grouped[stress].totalCoffee += Number(item.Coffee_Intake);

    grouped[stress].count += 1;
  });

  const result = Object.keys(grouped).map((stress) => {
    return {
      stressLevel: stress,

      avgCoffeeIntake: Number(
        grouped[stress].totalCoffee / grouped[stress].count,
      ).toFixed(2),
    };
  });

  return result;
};

export const getSleepCaffeineAnalytics = async () => {
  const data = await loadDataset();

  const grouped = {};

  data.forEach((item) => {
    const sleep = item.Sleep_Quality;

    if (!grouped[sleep]) {
      grouped[sleep] = {
        totalCaffeine: 0,
        count: 0,
      };
    }

    grouped[sleep].totalCaffeine += Number(item.Caffeine_mg);

    grouped[sleep].count += 1;
  });

  const result = Object.keys(grouped).map((sleep) => {
    return {
      sleepQuality: sleep,

      avgCaffeineMg: Number(
        grouped[sleep].totalCaffeine / grouped[sleep].count,
      ).toFixed(2),
    };
  });

  return result;
};
export const getBMIHeartRateAnalytics = async () => {
  const data = await loadDataset();

  return data.map((item) => {
    return {
      bmi: Number(item.BMI),

      heartRate: Number(item.Heart_Rate),

      stressLevel: item.Stress_Level,
    };
  });
};
export const getHealthIssuesDistribution = async () => {
  const data = await loadDataset();

  const distribution = {};

  data.forEach((item) => {
    const health = item.Health_Issues;

    if (!distribution[health]) {
      distribution[health] = 0;
    }

    distribution[health]++;
  });

  return distribution;
};
export const getOccupationStressAnalytics = async () => {
  const data = await loadDataset();

  const grouped = {};

  data.forEach((item) => {
    const occupation = item.Occupation;

    if (!grouped[occupation]) {
      grouped[occupation] = {
        totalStress: 0,
        count: 0,
      };
    }

    const stressMap = {
      Low: 1,
      Medium: 2,
      High: 3,
    };

    grouped[occupation].totalStress += stressMap[item.Stress_Level];

    grouped[occupation].count++;
  });

  return Object.keys(grouped).map((occupation) => ({
    occupation,

    avgStressLevel: (
      grouped[occupation].totalStress / grouped[occupation].count
    ).toFixed(2),
  }));
};
export const getCountryConsumptionAnalytics = async () => {
  const data = await loadDataset();

  const grouped = {};

  data.forEach((item) => {
    const country = item.Country;

    if (!grouped[country]) {
      grouped[country] = {
        totalCoffee: 0,
        count: 0,
      };
    }

    grouped[country].totalCoffee += Number(item.Coffee_Intake);

    grouped[country].count++;
  });

  return Object.keys(grouped).map((country) => ({
    country,

    avgCoffeeIntake: (
      grouped[country].totalCoffee / grouped[country].count
    ).toFixed(2),
  }));
};
export const getHighRiskUsers = async () => {
  const data = await loadDataset();

  return data
    .filter((item) => {
      return (
        item.Stress_Level === "High" &&
        Number(item.Caffeine_mg) > 300 &&
        Number(item.Sleep_Hours) < 6
      );
    })
    .slice(0, 50);
};
