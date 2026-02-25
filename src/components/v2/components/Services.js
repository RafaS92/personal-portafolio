import React, { useContext } from "react";
import "./Services.css";
import AppContext from "./context/AppContext";
import translate from "../i18n/translate";

function Services() {
  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;
  return (
    <section id="Services-v2" className="services-section">
      <h1 className="services-title">{translate("title2")}</h1>
      <div className="sCards">
        <div
          className={darkmode ? "sCard-white scard1" : "sCard scard1"}
          data-aos="fade-right"
        >
          <div className="sContainer">
            <img src="/images/website-build.png" alt="" />
          </div>
          <div className="sdetails">
            <h3 className={darkmode ? "stitle-white " : "stitle "}>
              {translate("servicest1")}
            </h3>
            <p
              className={`${
                darkmode ? "stext-white" : "stext"
              } sdetail-description`}
            >
              {translate("servicestd1")}
            </p>
            <ul
              className={`${darkmode ? "stext-white" : "stext"} service-list`}
            >
              <li className="service">{translate("sA1")}</li>
              <li className="service">{translate("sA2")}</li>
              <li className="service">{translate("sA3")}</li>
            </ul>
          </div>
        </div>
        <div
          className={darkmode ? "sCard-white scard2" : "sCard scard2 "}
          data-aos="fade-up"
        >
          <div className="sContainer">
            <img src="/images/AI-IMG2-min.jpg" alt="" />
          </div>
          <div className="sdetails">
            <h3 className={darkmode ? "stitle-white " : "stitle "}>
              {translate("servicest2")}
            </h3>
            <p
              className={`${
                darkmode ? "stext-white" : "stext"
              } sdetail-description`}
            >
              {translate("servicestd2")}
            </p>
            <ul
              className={`${darkmode ? "stext-white" : "stext"} service-list`}
            >
              <li className="service">{translate("sB1")}</li>
              <li className="service">{translate("sB2")}</li>
              <li className="service">{translate("sB3")}</li>
              <li className="service">{translate("sB4")}</li>
            </ul>
          </div>
        </div>
        <div
          className={darkmode ? "sCard-white scard3 " : "sCard scard3 "}
          data-aos="fade-left"
        >
          <div className="sContainer">
            <img src="/images/coding-min.png" alt="" />
          </div>
          <div className="sdetails">
            <h3 className={darkmode ? "stitle-white " : "stitle "}>
              {translate("servicest3")}
            </h3>
            <p
              className={`${
                darkmode ? "stext-white" : "stext"
              } sdetail-description`}
            >
              {translate("servicestd3")}
            </p>
            <ul
              className={`${darkmode ? "stext-white" : "stext"} service-list`}
            >
              <li className="service">{translate("sC1")}</li>
              <li className="service">{translate("sC2")}</li>
              <li className="service">{translate("sC3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
