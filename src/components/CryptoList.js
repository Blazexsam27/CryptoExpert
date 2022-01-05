import { React, useEffect, useState } from "react";
import "./styles/CryptoList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import * as services from "../services.js";

export default function CryptoList() {
  const [cryptoList, setcryptoList] = useState([]);
  const [cryptoStats, setCryptoStats] = useState([]);
  useEffect(async () => {
    await axios.get("/cryptoList").then((result) => {
      setcryptoList(result.data);
    });
    //iterate over each crypto name and create a new object.
    // services.getCryptoStats(cryptoId.toLowerCase()).then((result) => {
    //   setCryptoStats(result.data);
    // });
  }, []);
  return (
    <>
      <div className="headingContainer">
        <h1>Start Analysis</h1>
      </div>
      <div className="cryptoListContainer row">
        {cryptoList.length < 1 ? (
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          cryptoList.map((element) => {
            return (
              <div key={element.name} className="col-md-4">
                <Link
                  to={{
                    pathname: "/analysis",
                    search: `?args=${element.id}`,
                  }}
                  className="cardLink"
                >
                  <div className="card">
                    <img src={element.logo} alt="something" />
                    <div>Name : {element.name}</div>
                    <div>Current Price : {element.price}</div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
