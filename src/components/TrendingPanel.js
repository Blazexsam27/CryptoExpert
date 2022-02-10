import React from "react";
import "./styles/TrendingPanel.css";

export default function TrendingPanel(props) {
  const { cryptoStats } = props;

  return (
    <div className="trendingPanelContainer">
      <h1>Trending Cryptos</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In aliquam sit
        ut a illum nisi ducimus.
      </p>
      <div className="cryptoCard">
        <div className="cryptoCardContent">
          <img
            src={cryptoStats[0] != undefined ? cryptoStats[0].image : ""}
            alt="logo"
          />
          <div>
            <h5>crypto name</h5>
            <h5>crypto code</h5>
          </div>
        </div>
        <h4>price</h4>
      </div>
    </div>
  );
}
