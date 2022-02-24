import React from "react";
import "../styles/AboutComponentsStyles/AboutCrypto.css";
import { Link } from "react-router-dom";

export default function AboutCrypto(props) {
  const { about } = props;

  const capitalizeFirstLetter = (string) => {
    if (string !== undefined)
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="aboutContainer">
        <h3 className="header">About {capitalizeFirstLetter(about.name)}</h3>
        <div className="descContainer">{about.desc}</div>
        <h3 className="header">
          How {capitalizeFirstLetter(about.name)} Works?
        </h3>
        <div className="descContainer">{about.working}</div>
        <h3 className="header">Resource</h3>
        <Link to={`//${about.resources}`} target="_blank">
          <div className="descContainer">{about.resources}</div>
        </Link>
      </div>
    </>
  );
}
