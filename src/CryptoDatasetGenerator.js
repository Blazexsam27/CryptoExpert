// Program to convert JSON object of Price, Market Capital, Volume to CSV Format.

const axios = require("axios");
const csv = require("csv-writer").createObjectCsvWriter;

const createCsv = csv({
  path: "/home/blazexsam/CryptoExpert/src/csv_data/price_data.csv", // Append file name here
  header: [
    { id: "price", title: "price" },
    { id: "market_cap", title: "market_cap" },
    { id: "volume", title: "volume" },
  ],
});

let ObjArr,
  getCryptoData = async () => {
    return await axios.get(
      "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=inr&days=30" //Change crypto id here.
    );
  };

getCryptoData().then((response) => {
  let result = prepareObjects(response.data);
  createCsv.writeRecords(result);
});

prepareObjects = (data) => {
  ObjArr = {
    priceArr: data.prices,
    marketCapArr: data.market_caps,
    volumeArr: data.total_volumes,
  };
  return prepareCsvObjects(ObjArr);
};

prepareCsvObjects = (data) => {
  let result = [];
  for (let x = 0; x < data.priceArr.length; x++) {
    result.push({
      price: data.priceArr[x][1],
      market_cap: data.marketCapArr[x][1],
      volume: data.volumeArr[x][1],
    });
  }
  return result;
};
