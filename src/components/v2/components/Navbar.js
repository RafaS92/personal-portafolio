import React, { useState, useContext } from "react";
import { Switch } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import AppContext from "./context/AppContext";
import translate from "../i18n/translate";

function LanguageSelector({ locale, onSelectLanguage }) {
  const selectedLanguage = locale ? "en" : "es";

  return (
    <div
      className="language-selector"
      role="group"
      aria-label={locale ? "Select language" : "Seleccionar idioma"}
    >
      <svg
        className="language-globe"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.25 2.47 3.5 5.64 3.5 9s-1.25 6.53-3.5 9c-2.25-2.47-3.5-5.64-3.5-9S9.75 5.47 12 3Z" />
      </svg>
      {[
        { code: "en", label: "EN", name: "English" },
        { code: "es", label: "ES", name: "Español" },
      ].map((language, index) => {
        const isSelected = selectedLanguage === language.code;

        return (
          <React.Fragment key={language.code}>
            {index > 0 && (
              <span className="language-separator" aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              className={`language-option${isSelected ? " is-selected" : ""}`}
              aria-label={language.name}
              aria-pressed={isSelected}
              lang={language.code}
              onClick={() => onSelectLanguage(language.code)}
            >
              {language.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

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
              <LanguageSelector
                locale={props.locale}
                onSelectLanguage={props.changeLanguage}
              />
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
              <LanguageSelector
                locale={props.locale}
                onSelectLanguage={props.changeLanguage}
              />
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
