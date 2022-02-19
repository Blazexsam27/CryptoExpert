import React from "react";
import "../styles/HomeComponentsStyles/AnalysisIntro.css";

export default function AnalysisIntro() {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=021"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            loading="lazy"
            id="analysisIntroImg"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Realtime and accurate data regarding most popular crypto currencies.
          </h1>
          <p className="lead">
            CryptoExpert is best analysis platform in the market, which provides
            you advance tools and methods to make perfect decisions for your
            investments.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              id="getStartedBtn"
              className="btn-lg px-4 me-md-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
