import { React, useEffect, useState } from "react";
import "./styles/Analysis.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar.js";
import Loading from "./Loading.js";
import * as services from "../services.js";
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoId = new URLSearchParams(search).get("args");
  const [cryptoStats, setCryptoStats] = useState([]);
  const [cryptoMarketData_week, setCryptoMarketData_week] = useState([]); // Get Weekly Data.
  const [cryptoMarketData_month, setCryptoMarketData_month] = useState([]); // Get Monthly Data.
  const [priceList, setPriceList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  Chart.register(
    CategoryScale,
    LinearScale,
    Legend,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );

  useEffect(async () => {
    services.getCryptoStats(cryptoId).then((result) => {
      setCryptoStats(result.data);
    });
    setLoading(true);
    await services.getCryptoMarketData(cryptoId, "6").then((result) => {
      setCryptoMarketData_week(result.data);
    });

    await services.getCryptoMarketData(cryptoId, "30").then((result) => {
      setCryptoMarketData_month(result.data);
    });
    setLoading(false);
    handlePriceList();
  }, []);

  const handlePriceList = () => {
    if (!loading) {
      for (let price of cryptoMarketData_week.prices) {
        priceListTemp.push(price[1]);
      }
      setPriceList(priceListTemp);
    }
  };

  const handleTimeFilter = (filter) => {
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

  //  LINE CHART
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Crypto Metrics Chart",
      },
    },
  };
  const data = {
    labels: timeCategory,
    datasets: [
      {
        label: "price",
        data: priceList,
        borderColor: "#00ff08",
        backgroundColor: "#347d00",
      },
    ],
  };
  // LINE CHART

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

      <div className="analysisGraphContainer">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="filterBtnContainer" id="fliterBtnContainer">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button
                  id="weekBtn"
                  onClick={() => handleTimeFilter("week")}
                  type="button"
                  className="btn"
                >
                  Week
                </button>
                <button
                  id="monthBtn"
                  onClick={() => handleTimeFilter("month")}
                  type="button"
                  className="btn"
                >
                  Month
                </button>
              </div>
            </div>
            <Line options={options} data={data}></Line>
          </>
        )}
      </div>
    </>
  );
}
