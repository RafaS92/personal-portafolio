import { useContext, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import projectsData from "../../../data/projectsData.json";
import "./Projects.css";
import StatsContainer from "./StatsContainer";
import AppContext from "./context/AppContext";
import translate from "../i18n/translate";
import {
  ALL_PROJECTS_CATEGORY,
  selectProjects,
} from "../utils/projectSelectors";

const PROJECT_CATEGORIES = [ALL_PROJECTS_CATEGORY, "Web", "Mobile", "AI"];

function Projects({ locale }) {
  const [selected, setSelected] = useState(ALL_PROJECTS_CATEGORY);
  const [addAnimation, setAddAnimation] = useState("");
  const contextData = useContext(AppContext);
  const intl = useIntl();

  const darkmode = contextData.darkmode.darkTheme;
  const filteredProjects = selectProjects(projectsData.features, selected);
  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const archiveProjects = filteredProjects.filter(
    (project) => !project.featured
  );
  const filterLabels = {
    [ALL_PROJECTS_CATEGORY]: intl.formatMessage({ id: "projectsFilterAll" }),
    Web: intl.formatMessage({ id: "projectsFilterWeb" }),
    Mobile: intl.formatMessage({ id: "projectsFilterMobile" }),
    AI: intl.formatMessage({ id: "projectsFilterAI" }),
  };

  function addAnimationIcons() {
    setAddAnimation("animation");
    setTimeout(() => {
      setAddAnimation("");
    }, 1500);
  }

  useEffect(() => {
    addAnimationIcons();
  }, [selected]);

  return (
    <section
      id="Projects-v2"
      className={`projects-section projects-section--${
        darkmode ? "dark" : "light"
      }`}
    >
      <h1 className="projects-title" data-aos="fade-left">
        {translate("title4")}
      </h1>
      <p className="tech-text">{translate("techP1")}</p>
      <div
        className="project-filters"
        role="group"
        aria-label={intl.formatMessage({ id: "projectsFiltersLabel" })}
      >
        {PROJECT_CATEGORIES.map((category) => (
          <button
            type="button"
            className="project-filter"
            aria-pressed={selected === category}
            key={category}
            onClick={() => setSelected(category)}
          >
            {filterLabels[category]}
          </button>
        ))}
      </div>

      {featuredProjects.length > 0 ? (
        <div className="featured-projects-section">
          <h2 className="featured-projects-title">
            {translate("projectsFeaturedTitle")}
          </h2>
          <div className="featured-projects-grid">
            {featuredProjects.map((project) => (
              <article
                className={`featured-project ${addAnimation}`}
                key={project.id}
              >
                <img
                  className="featured-project-image"
                  src={project.image}
                  alt={project.title}
                />
                <div className="featured-project-content">
                  <h3>{project.title}</h3>
                  <p>
                    {locale ? project.description : project.descriptionspa}
                  </p>
                  <div className="featured-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <StatsContainer
                    projectTitle={project.title}
                    github={project.links.github}
                    website={project.links.website}
                    youtube={project.links.youtube}
                    document={project.links.document}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="project-scroll">
        <div className="project-container">
          {archiveProjects.map((project) => (
            <div
              className={`cardv2 ${addAnimation}`}
              key={project.id}
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "contain",
              }}
            >
              <div className={darkmode ? "card-content" : "card-content-white"}>
                <h2 className={darkmode ? "card-title" : "card-title-white"}>
                  {project.title}
                </h2>
                <p
                  className={
                    darkmode ? "card-body-text" : "card-body-text-white"
                  }
                >
                  {locale ? project.description : project.descriptionspa}
                </p>
                <StatsContainer
                  projectTitle={project.title}
                  github={project.links.github}
                  website={project.links.website}
                  youtube={project.links.youtube}
                  document={project.links.document}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Projects;
