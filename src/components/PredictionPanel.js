import React from "react";
import "./styles/PredictionPanel.css";

export default function PredictionPanel() {
  return (
    <div className="predictionPanel mt-5">
      <h4>Start Prediction</h4>
      <div>
        <p>
          Use our precise and highly trained machine learning models for
          statistical analysis and price prediction and many more.
        </p>
      </div>
      <div>
        <button className="btn btn-primary">Start</button>
      </div>
    </div>
  );
}
