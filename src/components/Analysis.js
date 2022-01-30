import { React, useEffect, useState } from "react";
import "./styles/Analysis.css";
import { Link, useLocation } from "react-router-dom";
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
  const [timeCategory, settimeCategory] = useState([]);
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

  const weekDaysMap = new Map([
    ["0", "Sunday"],
    ["1", "Monday"],
    ["2", "Tuesday"],
    ["3", "Wednesday"],
    ["4", "Thursday"],
    ["5", "Friday"],
    ["6", "Saturday"],
  ]);

  const pastDays = () => {
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      let day = d.getDay() - i;
      days.unshift(weekDaysMap.get(Math.abs(day).toString()));
    }
    settimeCategory(days);
  };

  const handlePriceList = () => {
    if (!loading) {
      for (let price of cryptoMarketData_week.prices) {
        priceListTemp.push(price[1]);
      }
      setPriceList(priceListTemp);
    }
  };

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

    pastDays();
  }, []);

  const handleTimeFilter = (filter) => {
    if (filter == "week") {
      for (let price of cryptoMarketData_week.prices)
        priceListTemp.push(price[1]);
      pastDays();
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
        borderColor: "#cc00c2",
        backgroundColor: "#ff0df3",
      },
    ],
  };
  // LINE CHART

  return (
    <>
      <div className="analysisPageNavbar">
        <Link to="/">
          <button className="btn btn-dark">back</button>
        </Link>
      </div>
      <div className="analysisBackground">
        <div className="summaryContainer">
          <div>
            {cryptoStats.length < 1 ? "" : <img src={cryptoStats[0].image} />}
            <h3>
              {cryptoStats.length < 1 ? (
                <Loading></Loading>
              ) : (
                cryptoStats[0].name
              )}
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
          <Loading></Loading>
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
