import { React, useEffect, useState } from "react";
import "./components/styles/Stats.css";
import * as services from "./services.js";

export default function Stats(props) {
  const [marketCaps, setMarketCaps] = useState([]);
  const [prices, setPriceStats] = useState([]);
  const [Volumes, setVolumeStats] = useState([]);

  useEffect(() => {
    services.getCryptoMarketStats(props.cryptoId).then((response) => {
      setMarketCaps(response.data.market_caps);
      setPriceStats(response.data.prices);
      setVolumeStats(response.data.total_volumes);
      console.log(response.data.prices);
    });
  }, [prices.length]);

  return (
    <>
      <div className="statsHeader">
        <h3>Market Stats</h3>
      </div>
      <div className="statsContainer">
        <table>
          <tbody>
            <tr className="rowTitle">
              <th>Market Capital(₹)</th>
              <th>Volume(24hr)</th>
              <th>Current Price(₹)</th>
            </tr>
            <tr className="rowElement">
              <th>₹ {marketCaps[0][1]}</th>
              <th>{Volumes[0][1]}</th>
              <th>₹ {prices[0][1]}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
