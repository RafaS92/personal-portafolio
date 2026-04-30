import React, { useContext } from "react";
import AppContext from "../context/AppContext";

function OutlineButton({ label, href }) {
  const {
    darkmode: { darkTheme },
  } = useContext(AppContext);

  return (
    <div className={darkTheme ? "Outline-button" : "Outline-button-white"}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </div>
  );
}

export default OutlineButton;
