import React from "react";
import { useIntl } from "react-intl";

const PROJECT_LINKS = [
  { property: "youtube", labelId: "projectsLinkVideo", icon: "fa fa-play" },
  {
    property: "document",
    labelId: "projectsLinkDocument",
    icon: "fa fa-file",
  },
  { property: "github", labelId: "projectsLinkCode", icon: "fab fa-github" },
  {
    property: "website",
    labelId: "projectsLinkWebsite",
    icon: "fas fa-globe",
  },
];

function StatsContainer(props) {
  const intl = useIntl();
  const getLinkLabel = (id) => {
    const label = intl.formatMessage({ id });

    return props.projectTitle ? `${props.projectTitle}: ${label}` : label;
  };
  const availableLinks = PROJECT_LINKS.filter(
    ({ property }) => props[property]
  );

  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <div className="stats-container-v2">
      {availableLinks.map(({ property, labelId, icon }) => (
        <a
          href={props[property]}
          className="stat-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={getLinkLabel(labelId)}
          key={property}
        >
          <i className={icon} aria-hidden="true"></i>
          <span className="project-link-label">
            {intl.formatMessage({ id: labelId })}
          </span>
        </a>
      ))}
    </div>
  );
}

export default StatsContainer;
