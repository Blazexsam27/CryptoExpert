import React from "react";
import "./styles/AboutCrypto.css";

export default function AboutCrypto() {
  return (
    <>
      <div className="aboutContainer">
        <h3 className="header">About Component</h3>
        <div className="descContainer">
          Bitcoin is a decentralized digital currency, without a central bank or
          single administrator, that can be sent from user to user on the
          peer-to-peer bitcoin network without the need for intermediaries.
        </div>
        <h3 className="header">How Bitcoin works?</h3>
        <div className="descContainer">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem optio
          cupiditate facilis, delectus corporis, laborum maxime et perferendis
          eos molestiae reiciendis nemo fugiat eveniet. Impedit nostrum nam
          exercitationem, maiores delectus quis nemo ducimus aspernatur
          assumenda!
        </div>
      </div>
    </>
  );
}
