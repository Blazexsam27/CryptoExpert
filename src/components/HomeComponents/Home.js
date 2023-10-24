import axios from "axios";
import { React, useEffect, useRef, useState } from "react";
import "../styles/HomeComponentsStyles/Home.css";
import CryptoList from "./CryptoList";
import AboutIntro from "../AboutComponents/AboutIntro";
import AnalysisIntro from "./AnalysisIntro";
import "../styles/HomeComponentsStyles/HomeMobile.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [cryptoList, setCryptoList] = useState([]);
  const [found, setFound] = useState(true);
  const ref = useRef(null);

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
          <h1 style={{ textAlign: "center" }}>CRYPTO EXPERT</h1>
          <p>
            Crypto Expert is an AI stimulated data analysis platform for crypto
            currency market.
          </p>
          <button
            onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary"
          >
            Explore↓
          </button>
        </div>
      </div>
      <div ref={ref}></div>
      <CryptoList cryptoList={cryptoList} found={found} />,
      <AnalysisIntro />,
      <AboutIntro />,
    </>
  );
}
