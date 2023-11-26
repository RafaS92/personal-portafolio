import React, { useContext } from "react";
import AppContext from "../context/AppContext";

function OutlineButton(props) {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  const { label, href } = props;
  return (
    <div className={darkmode ? "Outline-button" : "Outline-button-white"}>
      <a href={href} target="blank">
        <span>{label}</span>
      </a>
    </div>
  );
}

export default OutlineButton;
