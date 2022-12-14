import React, { useState } from "react";
import "./styles/PredictionPanel.css";
import { getStatistics } from "../services";

export default function PredictionPanel(props) {
  const { cryptoName, currency } = props;
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);
  const [interval, setInterval] = useState("");
  const [stats, setStats] = useState(null);
  const handleStatistics = async (e) => {
    e.preventDefault();
    const data = await getStatistics(days, hours, cryptoName, interval);
    console.log(data);
    setStats(data);
  };

  return (
    <div className="predictionPanel mt-5">
      <h4>Statistics</h4>
      <form className="find-mean-container my-2" onSubmit={handleStatistics}>
        <button className="btn btn-success mx-2" type="submit">
          Get Statistics
        </button>
        <label className="mx-2" htmlFor="days">
          days:
        </label>
        <input
          type="text"
          name="days"
          id="days"
          value={days}
          placeholder="default: 1"
          onChange={(e) => setDays(e.target.value)}
        />
        <label className="mx-2" htmlFor="hours">
          hours:
        </label>
        <input
          type="text"
          name="hours"
          placeholder="default: 0"
          value={hours}
          id="hours"
          onChange={(e) => setHours(e.target.value)}
        />
        <label className="mx-2" htmlFor="hours">
          interval:
        </label>
        <input
          type="text"
          name="interval"
          placeholder="hourly/daily/weekly..."
          value={interval}
          id="interval"
          onChange={(e) => setInterval(e.target.value)}
        />
      </form>
      {stats ? (
        <div className="stats-table">
          <table>
            <tbody>
              <tr className="header-row">
                <th>Legend</th>
                <th>Result</th>
              </tr>
              {stats.map((item) => {
                return (
                  <tr>
                    <th>{item.name}</th>
                    <th>{item.value}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
