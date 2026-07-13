import React, { useContext } from "react";
import { useIntl } from "react-intl";
import AppContext from "./context/AppContext";

function StatsContainer(props) {
  const contextData = useContext(AppContext);
  const intl = useIntl();
  let darkmode = contextData.darkmode.darkTheme;
  const getLinkLabel = (id) => {
    const label = intl.formatMessage({ id });

    return props.projectTitle ? `${props.projectTitle}: ${label}` : label;
  };

  return (
    <div className="stats-container-v2">
      {props.demo ? (
        <div className={darkmode ? "statv2" : " statv2-white  "}>
          <a
            href={props.youtube}
            className="stat-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLinkLabel("projectsLinkDemo")}
          >
            <div className="value">
              <i className="fab fa-youtube" />
            </div>
            {intl.formatMessage({ id: "projectsLinkDemo" })}
          </a>
        </div>
      ) : null}

      {props.youtube ? (
        <div className={darkmode ? "statv2" : " statv2-white  "}>
          <a
            href={props.youtube}
            className="stat-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLinkLabel("projectsLinkVideo")}
          >
            <div className="value">
              <i className="fa fa-play" />
            </div>
            {intl.formatMessage({ id: "projectsLinkVideo" })}
          </a>
        </div>
      ) : null}

      {props.document ? (
        <div className={darkmode ? "statv2" : " statv2-white  "}>
          <a
            href={props.document}
            className="stat-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLinkLabel("projectsLinkDocument")}
          >
            <div className="value">
              <i className="fa fa-file" />
            </div>
            {intl.formatMessage({ id: "projectsLinkDocument" })}
          </a>
        </div>
      ) : null}

      {props.github ? (
        <div className={darkmode ? "statv2" : " statv2-white  "}>
          <a
            href={props.github}
            className="stat-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLinkLabel("projectsLinkCode")}
          >
            <div className="value-v2">
              <i className="fab fa-github"></i>
            </div>
            <div className="type">
              {intl.formatMessage({ id: "projectsLinkCode" })}
            </div>
          </a>
        </div>
      ) : null}

      {props.website ? (
        <div className={darkmode ? "statv2" : " statv2-white  "}>
          <a
            href={props.website}
            className="stat-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLinkLabel("projectsLinkWebsite")}
          >
            <div className="value">
              <i className="fas fa-globe"></i>
            </div>
            {intl.formatMessage({ id: "projectsLinkWebsite" })}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default StatsContainer;
