import React from "react";
import Navbar from "./Navbar.js";
import Loading from "./Loading.js";
import "./styles/Analysis.css";
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

export default function AnalysisGraph() {
  Chart.register(
    CategoryScale,
    LinearScale,
    Legend,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );
  const [timeCategory, settimeCategory] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);

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

  return (
    <>
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
                  onClick={() => handleTimeAndPriceFilter("week")}
                  type="button"
                  className="btn"
                >
                  Week
                </button>
                <button
                  id="monthBtn"
                  onClick={() => handleTimeAndPriceFilter("month")}
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
