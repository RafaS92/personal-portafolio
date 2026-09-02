import React from "react";
import projectsData from "../../../../data/projectsData.json";

const projectsById = new Map(
  projectsData.features.map((project) => [project.id, project])
);

function getProjectPreviews(sources = []) {
  return sources
    .filter((source) => source.contentType === "project")
    .map((source) => ({ source, project: projectsById.get(source.itemId) }))
    .filter(({ project }) => Boolean(project));
}

export default function ProjectPreviews({
  sources,
  locale,
  label,
  openLabel,
  onOpen,
}) {
  const previews = getProjectPreviews(sources);
  if (previews.length === 0) return null;

  return (
    <section className="chatbot-project-previews" aria-label={label}>
      <span className="chatbot-project-previews-title">{label}</span>
      <div className="chatbot-project-previews-list">
        {previews.map(({ source, project }) => {
          const title = source.title || project.title;
          const description =
            locale === "es" ? project.descriptionspa : project.description;

          return (
            <article className="chatbot-project-preview" key={project.id}>
              <img
                alt=""
                className="chatbot-project-preview-image"
                loading="lazy"
                src={project.image}
              />
              <div className="chatbot-project-preview-summary">
                <h3>{title}</h3>
                <div className="chatbot-project-preview-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <p>{description}</p>
              <button
                type="button"
                onClick={() => onOpen(source)}
                aria-label={`${openLabel}: ${title}`}
              >
                <span aria-hidden="true">↗</span>
                {openLabel}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { getProjectPreviews };
