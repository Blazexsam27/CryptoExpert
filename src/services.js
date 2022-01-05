import axios from "axios";

export const getCryptoStats = async (cryptoName) => {
  return await axios.get(
    ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
};

// Add more arguments for futher filteration.
export const getCryptoMarketData = async (cryptoName) => {
  return await axios.get(
    `https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}/market_chart?vs_currency=inr&days=6&interval=daily`
  );
};
