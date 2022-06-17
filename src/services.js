import axios from "axios";

export const getCryptoStats = async (cryptoName) => {
  return await axios.get(
    ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
};

// Add more arguments for futher filteration.
// returns market data for particular crypto currency.
export const getCryptoMarketData = async (cryptoName, currency, days) => {
  return await axios.get(
    `https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
  );
};

// returns market stats for particular crypto currency (stats => name, vol, market capital etc)
export const getCryptoMarketStats = async (cryptoId, currency) => {
  return await axios.get(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency}&days=2&interval=daily`
  );
};
