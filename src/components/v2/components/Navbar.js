import React, { useState, useContext } from "react";
import { Switch } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import AppContext from "./context/AppContext";
import translate from "../i18n/translate";

function Navbar(props) {
  const [click, setClick] = useState(false);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const toggleTheme = () => {
    contextData.setDarkmode({
      darkTheme: !contextData.darkmode.darkTheme,
    });
    setClick(false);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenue = () => setClick(false);

  return (
    <>
      <nav className={darkmode ? "nav__white" : "navbarv2"}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <button
              type="button"
              aria-label="Go to hero section"
              onClick={() => {
                closeMobileMenue();
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img
                alt=""
                src={
                  darkmode
                    ? "/images/logos/logo-letters-black.png"
                    : "/images/logos/logo-letters-white.png"
                }
              />
            </button>
          </div>
          <button
            type="button"
            className={
              darkmode ? "menu-icon black-icon" : "menu-icon white-icon"
            }
            onClick={handleClick}
            aria-label={click ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={click}
            aria-controls="portfolio-navigation"
          >
            <FontAwesomeIcon
              style={{ fontSize: "22px" }}
              icon={click ? "times" : "bars"}
            />
          </button>

          <ul
            id="portfolio-navigation"
            className={
              darkmode
                ? click
                  ? "nav-menu active"
                  : "nav-menu"
                : click
                ? "nav-menu active-black"
                : "nav-menu"
            }
          >
            <li
              className="nav-item"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <img
                className="logo-img-mobile"
                alt=""
                src={
                  darkmode
                    ? "/images/logos/logo-letters-black.png"
                    : "/images/logos/logo-letters-white.png"
                }
              />
            </li>
            <li className="nav-item nav-item-mobile">
              <button
                type="button"
                onClick={props.changeLanguage}
                className="nav-links lan-btn"
                aria-label={
                  props.locale
                    ? "Cambiar idioma a español"
                    : "Switch language to English"
                }
              >
                <img
                  className="language-img"
                  src="/images/bilingual-flag.png"
                  alt=""
                />
              </button>
            </li>
            <li className="nav-item nav-item-mobile dark-light-switch">
              <i
                className={
                  darkmode ? "far fa-sun red-icon" : "far fa-sun red-icon"
                }
              ></i>
              <Switch
                checked={darkmode}
                onChange={toggleTheme}
                inputProps={{ "aria-label": "Toggle color theme" }}
              />
              <i
                className={
                  darkmode ? "far fa-moon red-icon" : "far fa-moon red-icon"
                }
              ></i>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("About-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav1")}
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("Services-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav2")}
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("Technologies-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav3")}
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("Projects-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav4")}
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("Other-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav5")}
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-links"
                onClick={() => {
                  closeMobileMenue();
                  document
                    .getElementById("Contact-v2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {translate("nav6")}
              </button>
            </li>
            <li className="nav-item nav-item-desktop">
              <button
                type="button"
                onClick={props.changeLanguage}
                className="nav-links lan-btn"
                aria-label={
                  props.locale
                    ? "Cambiar idioma a español"
                    : "Switch language to English"
                }
              >
                <img
                  className="language-img"
                  src="/images/bilingual-flag.png"
                  alt=""
                />
              </button>
            </li>
            <li className="nav-item nav-item-desktop dark-light-switch">
              <i
                className={
                  darkmode ? "far fa-sun red-icon" : "far fa-sun red-icon"
                }
              ></i>
              <Switch
                checked={darkmode}
                onChange={toggleTheme}
                inputProps={{ "aria-label": "Toggle color theme" }}
              />
              <i
                className={
                  darkmode ? "far fa-moon red-icon" : "far fa-moon red-icon"
                }
              ></i>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
