import axios from "axios";
import { React, useEffect, useState } from "react";
import "../styles/HomeComponentsStyles/Home.css";
import CryptoList from "./CryptoList";
import AboutIntro from "../AboutComponents/AboutIntro";
import AnalysisIntro from "./AnalysisIntro";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [cryptoList, setCryptoList] = useState([]);
  const [found, setFound] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3001/cryptoList?search_query=" + inputValue)
      .then((response) => {
        if (response.data.length > 0) setFound(true);
        else setFound(false);
        setCryptoList(response.data);
      });
    setInputValue("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  useEffect(() => {
    axios.get("/cryptoList").then((result) => {
      setCryptoList(result.data);
    });
  }, inputValue.length);

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
          <button className="exp-btn-grad mx-2">Explore</button>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="search-input my-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="searchInputId"
              onChange={handleInputChange}
              value={inputValue}
            />
            <button className="search-btn-grad" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <CryptoList cryptoList={cryptoList} found={found} />,
      <AnalysisIntro />,
      <AboutIntro />,
    </>
  );
}
