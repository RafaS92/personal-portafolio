import { useContext, useState } from "react";
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
const INITIAL_ARCHIVE_LIMIT = 6;

function Projects({ locale, projects = projectsData.features }) {
  const [selected, setSelected] = useState(ALL_PROJECTS_CATEGORY);
  const [visibleArchiveCount, setVisibleArchiveCount] = useState(
    INITIAL_ARCHIVE_LIMIT
  );
  const contextData = useContext(AppContext);
  const intl = useIntl();

  const darkmode = contextData.darkmode.darkTheme;
  const filteredProjects = selectProjects(projects, selected);
  const isAllProjectsView = selected === ALL_PROJECTS_CATEGORY;
  const featuredProjects = isAllProjectsView
    ? filteredProjects.filter((project) => project.featured)
    : [];
  const archiveProjects = isAllProjectsView
    ? filteredProjects.filter((project) => !project.featured)
    : filteredProjects;
  const visibleArchiveProjects = archiveProjects.slice(0, visibleArchiveCount);
  const remainingArchiveCount = Math.max(
    archiveProjects.length - visibleArchiveCount,
    0
  );
  const hasExpandableArchive = archiveProjects.length > INITIAL_ARCHIVE_LIMIT;
  const isArchiveExpanded =
    hasExpandableArchive && visibleArchiveCount >= archiveProjects.length;
  const filterLabels = {
    [ALL_PROJECTS_CATEGORY]: intl.formatMessage({ id: "projectsFilterAll" }),
    Web: intl.formatMessage({ id: "projectsFilterWeb" }),
    Mobile: intl.formatMessage({ id: "projectsFilterMobile" }),
    AI: intl.formatMessage({ id: "projectsFilterAI" }),
  };
  const archiveTitle =
    selected === ALL_PROJECTS_CATEGORY
      ? intl.formatMessage({ id: "projectsArchiveTitle" })
      : intl.formatMessage(
          { id: "projectsArchiveFilteredTitle" },
          { category: filterLabels[selected] }
        );

  const selectCategory = (category) => {
    setSelected(category);
    setVisibleArchiveCount(INITIAL_ARCHIVE_LIMIT);
  };

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
            onClick={() => selectCategory(category)}
          >
            {filterLabels[category]}
          </button>
        ))}
      </div>

      {featuredProjects.length > 0 ? (
        <section
          className="featured-projects-section"
          aria-labelledby="featured-projects-title"
        >
          <h2
            id="featured-projects-title"
            className="featured-projects-title"
          >
            {translate("projectsFeaturedTitle")}
          </h2>
          <div className="featured-projects-grid">
            {featuredProjects.map((project) => (
              <article className="featured-project" key={project.id}>
                <img
                  className="featured-project-image"
                  src={project.image}
                  alt={intl.formatMessage(
                    { id: "projectsImageAlt" },
                    { title: project.title }
                  )}
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
        </section>
      ) : null}

      <section
        className="project-archive-section"
        aria-labelledby="project-archive-title"
      >
        <h2 id="project-archive-title" className="project-archive-title">
          {archiveTitle}
          <span aria-live="polite"> · {filteredProjects.length}</span>
        </h2>

        {filteredProjects.length === 0 ? (
          <p className="project-empty-state" role="status">
            {translate("projectsEmpty")}
          </p>
        ) : null}

        <div className="project-archive-grid">
          {visibleArchiveProjects.map((project) => (
            <article className="archive-project" key={project.id}>
              <img
                className="archive-project-image"
                src={project.image}
                alt={intl.formatMessage(
                  { id: "projectsImageAlt" },
                  { title: project.title }
                )}
              />
              <div className="archive-project-details">
                <h3>{project.title}</h3>
                <div className="archive-project-tags">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <StatsContainer
                projectTitle={project.title}
                github={project.links.github}
                website={project.links.website}
                youtube={project.links.youtube}
                document={project.links.document}
              />
            </article>
          ))}
        </div>

        {hasExpandableArchive ? (
          <button
            type="button"
            className="project-show-more"
            aria-expanded={isArchiveExpanded}
            onClick={() =>
              setVisibleArchiveCount(
                isArchiveExpanded
                  ? INITIAL_ARCHIVE_LIMIT
                  : archiveProjects.length
              )
            }
          >
            {isArchiveExpanded
              ? intl.formatMessage({ id: "projectsShowLess" })
              : intl.formatMessage(
                  { id: "projectsShowMore" },
                  { count: remainingArchiveCount }
                )}
            <span
              className="project-show-more-icon"
              aria-hidden="true"
            ></span>
          </button>
        ) : null}
      </section>
    </section>
  );
}
export default Projects;
