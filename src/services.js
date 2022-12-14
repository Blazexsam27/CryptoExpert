import axios from "axios";
import * as ss from "simple-statistics";

const convertHoursToDays = (days = 0, hours) => {
  return parseInt(hours) / 24 + parseInt(days);
};

const filterPricesArray = (pricesArr) => {
  let result = [];
  for (let x of pricesArr) result.push(x[1]);
  return result;
};

const getDataWRTDays = (days, hours, cryptoName, interval) => {
  const totalDays = convertHoursToDays(days, hours);
  if (totalDays < 2) interval = "hourly";
  else interval = "daily";
  return getCryptoMarketData(cryptoName, "usd", totalDays, interval);
};

export const getCryptoStats = (cryptoName) => {
  return axios.get(
    ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
};

// Add more arguments for futher filteration.
// returns market data for particular crypto currency.
export const getCryptoMarketData = (
  cryptoName,
  currency,
  days,
  interval = "daily"
) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
  );
};

// returns market stats for particular crypto currency (stats => name, vol, market capital etc)
export const getCryptoMarketStats = async (cryptoId, currency) => {
  return await axios.get(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency}&days=2&interval=daily`
  );
};

export const getStatistics = async (
  days,
  hours,
  cryptoName,
  interval = "daily"
) => {
  const response = await getDataWRTDays(days, hours, cryptoName, interval);
  const pricesArr = filterPricesArray(response.data.prices);
  const mean = ss.mean(pricesArr);
  const median = ss.median(pricesArr);
  const mode = ss.mode(pricesArr);
  const variance = ss.variance(pricesArr);
  const standardDeviation = ss.standardDeviation(pricesArr);
  const interQuartileRange = ss.interquartileRange(pricesArr);
  const sampleSkewness = ss.sampleSkewness(pricesArr);
  return {
    mean,
    median,
    mode,
    variance,
    standardDeviation,
    interQuartileRange,
    sampleSkewness,
  };
};
