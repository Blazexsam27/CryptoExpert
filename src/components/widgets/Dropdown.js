import React from "react";
import "../styles/widget.css";

export default function Dropdown(props) {
  return (
    <div className="dropdown" style={{ marginTop: "32px" }}>
      <button
        className="btn btn-primary dropdown-toggle currency-dropdown"
        type="button"
        id="dropdownMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Currency
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.handleCurrencyChange}
            value="inr"
          >
            INR
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.handleCurrencyChange}
            value="usd"
          >
            USD
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.handleCurrencyChange}
            value="jpy"
          >
            JPY
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={props.handleCurrencyChange}
            value="eur"
          >
            EURO
          </button>
        </li>
      </ul>
    </div>
  );
}
