import React from "react";

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
}) {
  const sources = uniqueSources(message.sources);

  return (
    <div
      className={`chatbot-message ${
        message.role === "user" ? "user" : "bot"
      }${message.status === "error" ? " error" : ""}`}
    >
      <span>{message.content}</span>
      {message.role === "assistant" && sources.length > 0 && (
        <div className="chatbot-sources" aria-label={sourcesLabel}>
          {sources.map((source) => (
            <button
              type="button"
              className="chatbot-source"
              key={source.itemId || source.id}
              onClick={() => onSourceSelect(source)}
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
