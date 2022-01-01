import React from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="navbar">
        <img src="#" alt="something" />
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/explore">
            <li>Explore</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>

      <div className="introContainer">
        <div className="introSection">
          <h1>CRYPTO EXPERT</h1>
          <p>
            Crypto Expert is an AI stimulated data analysis platform for crypto
            currency market.
          </p>
        </div>

        <div className="searchForm">
          <button className="expBtn mx-2">Explore</button>
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
