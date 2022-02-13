import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./assets/crypto_expert_logo.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="something" />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/analysis">
          <li>Explore</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
}
