import React from "react";
import blockchain_logo from "../assets/blockchain_logo.jpg";
import "../styles/HomeComponentsStyles/AboutIntro.css";
import { Link } from "react-router-dom";

export default function AboutIntro() {
  return (
    <div className="px-4 py-5 my-2 text-center">
      <h1 className="display-5 fw-bold">
        The Most Advanced Crypto Analysis Platform.
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system, extensive
          prebuilt components, and powerful JavaScript plugins.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <div className="aboutIntroCardContainer">
            <Link to="">
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
            <Link to="">
              <img src={blockchain_logo} alt="" />
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
            <Link to="">
              <img src={blockchain_logo} alt="" />
            </Link>
            <div className="aboutIntroDesc">
              <h5>Daily news updates about crypto</h5>
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
