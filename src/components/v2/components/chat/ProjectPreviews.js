import React, { useEffect, useRef, useState } from "react";
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
  scrollLabel,
  onOpen,
}) {
  const previews = getProjectPreviews(sources);
  const listRef = useRef(null);
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const updateScrollHint = () => {
      setHasHorizontalScroll(list.scrollWidth > list.clientWidth + 1);
    };
    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(updateScrollHint)
        : null;

    updateScrollHint();
    resizeObserver?.observe(list);
    window.addEventListener("resize", updateScrollHint);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateScrollHint);
    };
  }, [previews.length]);

  if (previews.length === 0) return null;

  return (
    <section className="chatbot-project-previews" aria-label={label}>
      <span className="chatbot-project-previews-title">{label}</span>
      <div className="chatbot-project-previews-list" ref={listRef}>
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
      {hasHorizontalScroll && (
        <div className="chatbot-project-previews-scroll-hint">
          {scrollLabel}
          <span aria-hidden="true">→</span>
        </div>
      )}
    </section>
  );
}

export { getProjectPreviews };
