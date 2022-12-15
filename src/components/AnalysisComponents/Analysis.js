import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as services from "../../services.js";
import Dropdown from "../widgets/Dropdown.js";
import Loading from "../widgets/Loading.js";
import AnalysisGraph from "./AnalysisGraph.js";
import Stats from "./Stats.js";
import AboutCrypto from "../AboutComponents/AboutCrypto.js";
import axios from "axios";
import TrendingPanel from "../TrendingPanel.js";
import PredictionPanel from "../PredictionPanel.js";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoNameId =
    new URLSearchParams(search).get("coinNameId") || "bitcoin";
  const cryptoName = new URLSearchParams(search).get("name") || "bitcoin"; // MAYBE REQUIRED FOR FURTHER COMPONENTS.
  const cryptoSymbol = new URLSearchParams(search).get("symbol") || "btc";
  const [currency, setCurrency] = useState("inr");
  const [cryptoStats, setCryptoStats] = useState([]);
  const [cryptoMarketData_week, setCryptoMarketData_week] = useState([]); // Get Weekly Data.
  const [cryptoMarketData_month, setCryptoMarketData_month] = useState([]); // Get Monthly Data.
  const [priceList, setPriceList] = useState([]);
  const [aboutCrypto, setAboutCrypto] = useState({});
  const [timeFilter, settimeFilter] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);

  const priceListTemp = [];
  const days = [];
  const currencyMap = new Map([
    ["inr", "₹"],
    ["usd", "$"],
    ["jpy", "¥"],
    ["eur", "€"],
  ]);

  const handleCurrencyChange = (e) => {
    e.preventDefault();
    setCurrency(e.target.value);
  };

  useEffect(() => {
    services.getCryptoStats(cryptoNameId).then((result) => {
      setCryptoStats(result.data);
    });
    services.getCryptoMarketData(cryptoNameId, currency, "6").then((result) => {
      setCryptoMarketData_week(result.data);
      handleTimeAndPriceFilter("week", result.data.prices, 8);
    });

    services
      .getCryptoMarketData(cryptoNameId, currency, "30")
      .then((result) => {
        setCryptoMarketData_month(result.data);
      });

    axios.get("/about_crypto/?symbol=" + cryptoSymbol).then((response) => {
      setAboutCrypto(response.data[0]);
    });
    settimeFilter(days);
    setPriceList(priceListTemp);
  }, [cryptoNameId, currency]);

  const handleTimeAndPriceFilter = (filter, prices, time) => {
    if (filter == "week") {
      for (const price of prices) priceListTemp.push(price[1]);
      for (let x = 1; x < time; x++) days.push(x.toString());
    } else {
      for (const price of prices) priceListTemp.push(price[1]);
      for (let x = 1; x < 31; x++) days.push(x.toString());
    }
    settimeFilter(days);
    setPriceList(priceListTemp);
  };

  return (
    <>
      <div className="analysisContainer">
        <div className="summaryAndGraphContainer">
          <div className="summaryContainer">
            <div>
              {cryptoStats.length < 1 ? "" : <img src={cryptoStats[0].image} />}
              <h3>
                {cryptoStats.length < 1 ? <Loading /> : cryptoStats[0].name}
              </h3>
              <Dropdown handleCurrencyChange={handleCurrencyChange} />
            </div>
            <h4 id="cryptoprice">
              {cryptoMarketData_week.length < 1
                ? ""
                : currencyMap.get(currency) +
                  " " +
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
                  onClick={() =>
                    handleTimeAndPriceFilter(
                      "week",
                      cryptoMarketData_week.prices,
                      8
                    )
                  }
                  type="button"
                  className="btn"
                >
                  Week
                </button>
                <button
                  id="monthBtn"
                  onClick={() =>
                    handleTimeAndPriceFilter(
                      "month",
                      cryptoMarketData_month.prices,
                      31
                    )
                  }
                  type="button"
                  className="btn"
                >
                  Month
                </button>
              </div>
            </div>
          </div>
          <div className="graph-and-trending">
            <AnalysisGraph
              timeFilterArr={timeFilter}
              priceListArr={priceList}
              cryptoId={cryptoNameId}
            />
            <TrendingPanel cryptoStats={cryptoStats} />
          </div>
          <Stats cryptoId={cryptoNameId} />
          <PredictionPanel
            cryptoName={cryptoNameId}
            currency={currencyMap.get(currency)}
          />
          <AboutCrypto about={aboutCrypto} />
        </div>
      </div>
    </>
  );
}
