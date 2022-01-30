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
  const [cryptoMarketData, setCryptoMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  let priceList = [];

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
    services.getCryptoStats(cryptoId.toLowerCase()).then((result) => {
      setCryptoStats(result.data);
    });

    setLoading(true);
    await services
      .getCryptoMarketData(cryptoId.toLowerCase())
      .then((result) => {
        setCryptoMarketData(result.data);
      });

    setLoading(false);
  }, []);

  if (!loading) {
    for (let price of cryptoMarketData.prices) priceList.push(price[1]);
  }

  const days = [];
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
      days.push(weekDaysMap.get(Math.abs(day).toString()));
    }
  };
  pastDays();
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
    labels: days,
    datasets: [
      {
        label: "price",
        data: priceList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

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
            {cryptoMarketData.length < 1
              ? ""
              : "₹ " +
                cryptoMarketData.prices[cryptoMarketData.prices.length - 1][1]}
          </h4>
        </div>
      </div>

      <div className="analysisGraphContainer">
        {loading ? (
          <Loading></Loading>
        ) : (
          <Line options={options} data={data}></Line>
        )}
      </div>
    </>
  );
}
