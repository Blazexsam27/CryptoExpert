import { React, useState, useEffect } from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="introContainer">
        <div className="introSection">
          <h1>CRYPTO EXPERT</h1>
          <p>
            Crypto Expert is an AI stimulated data analysis platform for crypto
            currency market.
          </p>
        </div>

        <div className="searchForm">
          <Link to="/analysis">
            <button className="expBtn mx-2">Explore</button>
          </Link>
          <form class="d-flex">
            <input
              class="form-control me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
