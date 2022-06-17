import React from "react";
import "../styles/AnalysisComponentsStyles/Analysis.css";
import { useState, useEffect } from "react";
import "../styles/AnalysisComponentsStyles/AnalysisMobile.css";
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

  const { priceListArr, timeFilterArr } = props;
  const [priceList, setPriceList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const createChart = () => {
    setPriceList(priceListArr);
    setTimeList(timeFilterArr);
  };
  const data = {
    labels: timeList,
    datasets: [
      {
        label: "price",
        data: priceList,
        borderColor: "#00ff08",
        backgroundColor: "#347d00",
      },
    ],
  };
  useEffect(() => {
    createChart();
  }, [priceListArr.length]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <div className="analysisGraphContainer">
        {priceList.length > 0 ? (
          <Line options={options} data={data}></Line>
        ) : (
          "Loading Stats Please Wait..."
        )}
      </div>
    </>
  );
}
