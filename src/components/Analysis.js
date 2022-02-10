import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as services from "../services.js";
import Navbar from "./Navbar.js";
import Loading from "./Loading.js";
import AnalysisGraph from "./AnalysisGraph.js";
import Stats from "./Stats.js";
import AboutCrypto from "./AboutCrypto.js";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoId = new URLSearchParams(search).get("args");
  const [cryptoStats, setCryptoStats] = useState([]);
  const [cryptoMarketData_week, setCryptoMarketData_week] = useState([]); // Get Weekly Data.
  const [cryptoMarketData_month, setCryptoMarketData_month] = useState([]); // Get Monthly Data.
  const [priceList, setPriceList] = useState([]);
  const [timeCategory, settimeCategory] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);

  let priceListTemp = [];
  const days = [];

  useEffect(async () => {
    await services.getCryptoStats(cryptoId).then((result) => {
      setCryptoStats(result.data);
    });
    await services.getCryptoMarketData(cryptoId, "6").then((result) => {
      setCryptoMarketData_week(result.data);
    });

    await services.getCryptoMarketData(cryptoId, "30").then((result) => {
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
  };

  return (
    <>
      <Navbar />
      <div className="summaryAndGraphContainer">
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
          <div className="filterBtnContainer" id="fliterBtnContainer">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                id="weekBtn"
                onClick={() => handleTimeAndPriceFilter("week")}
                type="button"
                className="btn"
              >
                Week
              </button>
              <button
                id="monthBtn"
                onClick={() => handleTimeAndPriceFilter("month")}
                type="button"
                className="btn"
              >
                Month
              </button>
            </div>
          </div>
        </div>
        <AnalysisGraph time={timeCategory} priceList={priceList} />
        <Stats cryptoId={cryptoId} />
        <AboutCrypto />
      </div>
    </>
  );
}
