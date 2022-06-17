import React from "react";
import blockchain_logo from "../assets/blockchain_logo.jpg";
import "../styles/AboutComponentsStyles/AboutIntro.css";
import bitcoin_logo from "../assets/bitcoin_logo.png";
import news_logo from "../assets/news_logo.png";
import { Link } from "react-router-dom";
import "../styles/AboutComponentsStyles/AboutIntroMobile.css";

export default function AboutIntro() {
  return (
    <div className="px-4 py-5 my-2 text-center">
      <h1 className="display-5 fw-bold">
        The Most Advanced Crypto Analysis Platform.
      </h1>
      <div className=" col-lg-6 mx-auto">
        <p className="lead mb-4">
          CryptoExpert has precise and reliable trained LTSM models which gives
          you the best possible predictions, while keeping in mind about he past
          600 records.
        </p>
        <div className="d-grid gap-2 d-sm-flex flex-column justify-content-sm-center">
          <div className="aboutIntroCardContainer">
            <Link to="//en.wikipedia.org/wiki/Blockchain">
              <img src={blockchain_logo} alt="" />
            </Link>
            <div className="aboutIntroDesc">
              <h5>Learn about blockchain</h5>
              <p>
                Learn about advanced blockchain and its technologies to build
                your own crypto currencies.
              </p>
            </div>
          </div>
          <div className="aboutIntroCardContainer">
            <Link to="//www.investopedia.com/cryptocurrency-4427699">
              <img src={bitcoin_logo} alt="" />
            </Link>
            <div className="aboutIntroDesc">
              <h5>Learn about crypto investments</h5>
              <p>
                Learn all basics and advanced concepts of investment in crypto
                market in easy and elaborated steps.
              </p>
            </div>
          </div>
          <div className="aboutIntroCardContainer">
            <Link to="//cryptonews.com/">
              <img src={news_logo} alt="" />
            </Link>
            <div className="aboutIntroDesc">
              <h5>Daily updates about crypto</h5>
              <p>
                Get latest new updates about crypto currencies to make crucial
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
