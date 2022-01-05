import { React, useEffect, useState } from "react";
import "./styles/Analysis.css";
import { Link, useLocation } from "react-router-dom";
import * as services from "../services.js";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoId = new URLSearchParams(search).get("args");
  const [cryptoStats, setCryptoStats] = useState([]);
  const [cryptoMarketData, setCryptoMarketData] = useState([]);

  useEffect(async () => {
    services.getCryptoStats(cryptoId.toLowerCase()).then((result) => {
      setCryptoStats(result.data);
    });

    services.getCryptoMarketData(cryptoId.toLowerCase()).then((result) => {
      setCryptoMarketData(result.data);
    });
  }, []);

  return (
    <>
      <div className="analysisPageNavbar">
        <Link to="/">
          <button className="btn btn-dark">back</button>
        </Link>
      </div>
      <div className="analysisBackground">
        <div className="summaryContainer">
          <img
            src={cryptoStats.length < 1 ? "" : cryptoStats[0].image}
            alt="Logo"
          />
          <h3>{cryptoStats.length < 1 ? "Loading" : cryptoStats[0].name}</h3>
        </div>
      </div>

      <div className="analysisGraphContainer">
        <h1>
          {cryptoMarketData.length < 1
            ? "Loading"
            : "₹ " +
              cryptoMarketData.prices[cryptoMarketData.prices.length - 1][1]}
        </h1>
      </div>
    </>
  );
}
