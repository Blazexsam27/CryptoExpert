import React from "react";
import { Link } from "react-router-dom";
import "../styles/widget.css";
import logo from "../assets/crypto_expert_logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="something" />
      </Link>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/analysis?coinNameId=bitcoin&symbol=btc&name=bitcoin">
          <li>Explore</li>
        </Link>
        <Link to="/cryptonews">
          <li>News</li>
        </Link>
      </ul>
    </div>
  );
}
