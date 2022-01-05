import { React, useEffect, useState } from "react";
import "./styles/Analysis.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Analysis() {
  const { search } = useLocation();
  const cryptoId = new URLSearchParams(search).get("args");
  const [cryptoStats, setCryptoStats] = useState([]);
  useEffect(async () => {
    await axios
      .get(
        ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoId.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((result) => {
        setCryptoStats(result.data);
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
        <div className="analysisHeading">
          <img
            src={cryptoStats.length < 1 ? "" : cryptoStats[0].image}
            alt="Logo"
          />
          <h3>{cryptoStats.length < 1 ? "Loading" : cryptoStats[0].name}</h3>
        </div>
      </div>
      <div className="analysisGraphContainer">
        <h1>{cryptoStats.length < 1 ? "Loading" : cryptoStats[0].name}</h1>
      </div>
    </>
  );
}
