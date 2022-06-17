import { React } from "react";
import "../styles/HomeComponentsStyles/CryptoList.css";
import { Link } from "react-router-dom";
import Loading from "../widgets/Loading.js";

export default function CryptoList(props) {
  const { cryptoList, found } = props;

  return (
    <>
      <div className="headingContainer">
        <h1 style={{ textAlign: "center" }}>Trending Crypto Currencies</h1>
      </div>
      <div className="cryptoListContainer row">
        {!found ? (
          <>
            <Loading></Loading>
            <h4>Sorry No Results Found!</h4>
          </>
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
