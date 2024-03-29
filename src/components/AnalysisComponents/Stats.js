import { React, useEffect, useState } from "react";
import "../styles/Stats.css";
import * as services from "../../services.js";

export default function Stats(props) {
  const [marketCaps, setMarketCaps] = useState([]);
  const [prices, setPriceStats] = useState([]);
  const [volumes, setVolumeStats] = useState([]);

  useEffect(async () => {
    services.getCryptoMarketStats(props.cryptoId, "inr").then((response) => {
      setMarketCaps(response.data.market_caps);
      setPriceStats(response.data.prices);
      setVolumeStats(response.data.total_volumes);
    });
  }, [props.cryptoId]);

  return (
    <div className="stats-container">
      <div className="statsHeader">
        <h3>{props.cryptoId.toUpperCase()} Market Stats</h3>
      </div>
      <div className="stats-content">
        <table>
          <tbody>
            <tr className="rowTitle">
              <th>Market Capital(₹)</th>
              <th>Volume(24hr)</th>
              <th>Current Price(₹)</th>
            </tr>
            <tr className="rowElement">
              <th>₹ {marketCaps.length > 0 ? marketCaps[0][1] : "Loading"}</th>
              <th>₹ {volumes.length > 0 ? volumes[0][1] : "Loading"}</th>
              <th>₹ {prices.length > 0 ? prices[0][1] : "Loading"}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
