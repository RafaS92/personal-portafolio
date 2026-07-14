import React, { useContext } from "react";
import "./Resume.css";
import AppContext from "./context/AppContext";
import translate from "./../i18n/translate";

const resources = [
  {
    key: "past",
    title: "past",
    description: "pastDescription",
    href: "https://version-1.d3ihp0pnvf8gdq.amplifyapp.com/",
    icon: "fas fa-window-maximize",
  },
  {
    key: "linkedin",
    title: "LinkedIn",
    description: "linkedinDescription",
    href: "https://www.linkedin.com/in/rafael-salvador-valdez/",
    icon: "fab fa-linkedin-in",
  },
  {
    key: "resume",
    title: "resume",
    description: "resumeDescription",
    href:
      "https://docs.google.com/document/d/15hHyOiujwpI5EqQvDbtUhSaY9tTiYQ_KmWTShJbcl4o/edit?usp=sharing",
    icon: "far fa-file-alt",
  },
];

function BrowserPreview() {
  return (
    <div className="resource-preview resource-preview--browser" aria-hidden="true">
      <div className="browser-preview__toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="browser-preview__body">
        <div className="browser-preview__image">
          <span />
        </div>
        <div className="browser-preview__content">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-preview__actions">
          <span />
          <span />
        </div>
        <div className="browser-preview__footer" />
      </div>
    </div>
  );
}

function LinkedInPreview() {
  return (
    <div className="resource-preview resource-preview--profile" aria-hidden="true">
      <div className="profile-preview__avatar">
        <i className="fas fa-user" />
      </div>
      <div className="profile-preview__details">
        <span />
        <span />
        <div>
          <i />
          <i />
        </div>
      </div>
      <div className="profile-preview__dots" />
    </div>
  );
}

function ResumePreview() {
  return (
    <div className="resource-preview resource-preview--document" aria-hidden="true">
      <div className="document-preview__page">
        <div className="document-preview__fold" />
        <div className="document-preview__heading">
          <i className="fas fa-user" />
          <span />
        </div>
        <div className="document-preview__rule document-preview__rule--wide" />
        <div className="document-preview__rule" />
        <div className="document-preview__rule document-preview__rule--short" />
        <div className="document-preview__bullets">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

const previews = {
  past: BrowserPreview,
  linkedin: LinkedInPreview,
  resume: ResumePreview,
};

function ResourceCard({ resource }) {
  const Preview = previews[resource.key];
  const title =
    resource.title === "LinkedIn" ? resource.title : translate(resource.title);

  return (
    <div className={`resource-card-shell resource-card-shell--${resource.key}`}>
      <a
        className={`resource-card resource-card--${resource.key}`}
        href={resource.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="resource-card__copy">
          <span className="resource-card__icon" aria-hidden="true">
            <i className={resource.icon} />
          </span>
          <h3>{title}</h3>
          <p>{translate(resource.description)}</p>
        </div>
        <Preview />
      </a>
    </div>
  );
}

function Resume() {
  const contextData = useContext(AppContext);
  const darkmode = contextData.darkmode.darkTheme;

  return (
    <section
      className={`resume__section-v2 ${
        darkmode ? "resume__section-v2--dark" : "resume__section-v2--light"
      }`}
      id="Other-v2"
    >
      <div className="resume__glow resume__glow--blue" aria-hidden="true" />
      <div className="resume__glow resume__glow--amber" aria-hidden="true" />
      <div className="resume__layout">
        <header className="resume__intro" data-aos="fade-up">
          <h2>{translate("Resumet")}</h2>
          <p className="resume__description">{translate("Resumecon")}</p>
        </header>

        <div className="resume__resources" data-aos="fade-up">
          {resources.map((resource) => (
            <ResourceCard key={resource.key} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resume;
