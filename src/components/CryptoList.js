import { React, useEffect, useState } from "react";
import "./styles/CryptoList.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
        {cryptoList.length < 1
          ? "Loading"
          : cryptoList.map((element) => {
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
            })}
      </div>
    </>
  );
}
