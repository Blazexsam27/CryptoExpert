import React from "react";
import { Link } from "react-router-dom";

export default function cryptoCard(props) {
  const { name, image, symbol, cryptoIdName } = props;
  return (
    <>
      <Link
        to={{
          pathname: "/analysis",
          search: `?coinNameId=${cryptoIdName}&symbol=${symbol}&name=${name}`,
        }}
      >
        <div className="cryptoCard" style={{ marginBottom: "1rem" }}>
          <div className="cryptoCardContent">
            <img src={image != undefined ? image : ""} alt="logo" />
            <div>
              <p style={{ fontWeight: "bold", margin: 0 }}>
                {name != undefined ? name : "Loading..."}
              </p>
              <p>{symbol}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
