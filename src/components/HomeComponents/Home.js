import axios from "axios";
import { React, useState } from "react";
import "../styles/HomeComponentsStyles/Home.css";
import CryptoList from "./CryptoList";
import AboutIntro from "./AboutIntro";
import AnalysisIntro from "./AnalysisIntro";

export default function Home() {
  const [inputValue, setInputValue] = useState(undefined);
  const handleSearch = () => {
    console.log(inputValue);
    console.log("something");
    // axios.get("/cryptoList?search_query=" + input).then((response) => {
    //   console.log(response.data);
    // });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

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
            />
            <button className="search-btn-grad" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <CryptoList />,
      <AnalysisIntro />,
      <AboutIntro />,
    </>
  );
}
