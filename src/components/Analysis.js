import React from "react";
import "./styles/Analysis.css";

export default function Analysis() {
  return (
    <>
      <div className="analysisIntroContainer">
        <img src="" alt="Crypto Logo" />
        <p>Crypto Name</p>
      </div>
      <div className="analysisStatsContainer">
        <p>Current Buy Price : $10000.00</p>
      </div>

      <div className="analysisStatsGraph"></div>
      <div className="analysisInfoDesc">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit hic
          nostrum animi corrupti, dignissimos numquam neque!
        </p>
      </div>
    </>
  );
}
