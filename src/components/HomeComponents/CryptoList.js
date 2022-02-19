import { React, useEffect, useState } from "react";
import "../styles/HomeComponentsStyles/CryptoList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading.js";

export default function CryptoList() {
  const [cryptoList, setcryptoList] = useState([]);
  useEffect(async () => {
    await axios.get("/cryptoList").then((result) => {
      setcryptoList(result.data);
    });
  }, []);
  return (
    <>
      <div className="headingContainer">
        <h1>Start Analysis</h1>
      </div>
      <div className="cryptoListContainer row">
        {cryptoList.length < 1 ? (
          <Loading></Loading>
        ) : (
          cryptoList.map((element) => {
            return (
              <div key={element.name} className="col-md-4">
                <Link
                  to={{
                    pathname: "/analysis",
                    search: `?coinNameId=${element.crypto_id_name}&symbol=${element.symbol}&name=${element.name}`,
                  }}
                  className="cardLink"
                >
                  <div className="card">
                    <img src={element.logo} alt="crypto_logo" />
                    <div>Name : {element.name}</div>
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
