import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as services from "../services.js";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoId = new URLSearchParams(search).get("args");
  const [cryptoStats, setCryptoStats] = useState([]);
  const [cryptoMarketData_week, setCryptoMarketData_week] = useState([]); // Get Weekly Data.
  const [cryptoMarketData_month, setCryptoMarketData_month] = useState([]); // Get Monthly Data.
  const [priceList, setPriceList] = useState([]);

  let priceListTemp = [];
  const days = [];

  useEffect(async () => {
    services.getCryptoStats(cryptoId).then((result) => {
      setCryptoStats(result.data);
    });
    services.getCryptoMarketData(cryptoId, "6").then((result) => {
      setCryptoMarketData_week(result.data);
      console.log(result.data);
      handleTimeAndPriceFilter("week");
    });
    services.getCryptoMarketData(cryptoId, "30").then((result) => {
      setCryptoMarketData_month(result.data);
    });
  }, []);

  const handleTimeAndPriceFilter = (filter) => {
    if (filter == "week") {
      for (let price of cryptoMarketData_week.prices)
        priceListTemp.push(price[1]);
      for (let x = 1; x < 8; x++) days.push(x.toString());
    } else {
      for (let price of cryptoMarketData_month.prices)
        priceListTemp.push(price[1]);
      for (let x = 1; x < 31; x++) days.push(x.toString());
    }
    settimeCategory(days);
    setPriceList(priceListTemp);
    console.log(priceList);
  };

  return (
    <>
      <Navbar />
      <div className="analysisBackground">
        <div className="summaryContainer">
          <div>
            {cryptoStats.length < 1 ? "" : <img src={cryptoStats[0].image} />}
            <h3>
              {cryptoStats.length < 1 ? <Loading /> : cryptoStats[0].name}
            </h3>
          </div>
          <h4 id="cryptoprice">
            {cryptoMarketData_week.length < 1
              ? ""
              : "₹ " +
                cryptoMarketData_week.prices[
                  cryptoMarketData_week.prices.length - 1
                ][1]}
          </h4>
        </div>
      </div>
      <AnalysisGraph />
    </>
  );
}
