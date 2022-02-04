import React from "react";
import Stats from "../Stats";
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

export default function AnalysisGraph(props) {
  Chart.register(
    CategoryScale,
    LinearScale,
    Legend,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels: props.time,
    datasets: [
      {
        label: "price",
        data: props.priceList,
        borderColor: "#00ff08",
        backgroundColor: "#347d00",
      },
    ],
  };

  return (
    <>
      <div className="analysisGraphContainer">
        {props.priceList.length > 0 ? (
          <Line options={options} data={data}></Line>
        ) : (
          "Please Select a Time Filter"
        )}
      </div>
    </>
  );
}
