import React from "react";
import ProjectPreviews from "./ProjectPreviews";

function uniqueSources(sources = []) {
  const seen = new Set();
  return sources.filter((source) => {
    const key = source.itemId || source.id;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ChatMessage({
  message,
  onRetry,
  retryLabel,
  onSourceSelect,
  sourcesLabel,
  locale,
  projectPreviewsLabel,
  projectPreviewOpenLabel,
  projectPreviewScrollLabel,
}) {
  const sources = uniqueSources(message.sources);
  const nonProjectSources = sources.filter(
    (source) => source.contentType !== "project"
  );

  return (
    <div
      className={`chatbot-message ${
        message.role === "user" ? "user" : "bot"
      }${message.status === "error" ? " error" : ""}`}
    >
      <span>{message.content}</span>
      {message.role === "assistant" && (
        <ProjectPreviews
          sources={sources}
          locale={locale}
          label={projectPreviewsLabel}
          openLabel={projectPreviewOpenLabel}
          scrollLabel={projectPreviewScrollLabel}
          onOpen={onSourceSelect}
        />
      )}
      {message.role === "assistant" && nonProjectSources.length > 0 && (
        <div className="chatbot-sources" aria-label={sourcesLabel}>
          {nonProjectSources.map((source) => (
            <button
              type="button"
              className="chatbot-source"
              key={source.itemId || source.id}
              onClick={() => onSourceSelect(source, message.id)}
            >
              <span aria-hidden="true">↗</span>
              {source.title}
            </button>
          ))}
        </div>
      )}
      {message.status === "error" && message.retry && (
        <button
          type="button"
          className="chatbot-retry"
          onClick={() => onRetry(message)}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export { uniqueSources };
