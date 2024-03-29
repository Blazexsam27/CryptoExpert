import React, { useEffect } from "react";
import "./styles/TrendingPanel.css";
import { useState } from "react";
import axios from "axios";
import CryptoCard from "./widgets/CryptoCard";

export default function TrendingPanel(props) {
  const { cryptoStats } = props;
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(async () => {
    await axios.get("/cryptoList").then((response) => {
      setCryptoList(response.data);
    });
  }, [cryptoList.length]);

  const card = cryptoList.map((element) => {
    return (
      <div key={element.id}>
        <CryptoCard
          name={element.name}
          image={element.logo}
          symbol={element.symbol}
          cryptoIdName={element.crypto_id_name}
        />
      </div>
    );
  });

  return (
    <div className="trendingPanelContainer mx-3">
      <h1>Trending</h1>
      {card}
    </div>
  );
}
