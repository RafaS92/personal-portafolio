import React, { useCallback, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ExploreRafa from "./ExploreRafa";

export default function ChatMessageList({
  messages,
  isLoading,
  onRetry,
  retryLabel,
  loadingLabel,
  onSourceSelect,
  sourcesLabel,
  locale,
  projectPreviewsLabel,
  projectPreviewOpenLabel,
  onExploreSelect,
}) {
  const bodyRef = useRef(null);

  const handleExploreExpansionChange = useCallback((isExpanded) => {
    if (isExpanded && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [isLoading, messages]);

  return (
    <div
      className="chatbot-body"
      ref={bodyRef}
      aria-live="polite"
      aria-busy={isLoading}
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onRetry={onRetry}
          retryLabel={retryLabel}
          onSourceSelect={onSourceSelect}
          sourcesLabel={sourcesLabel}
          locale={locale}
          projectPreviewsLabel={projectPreviewsLabel}
          projectPreviewOpenLabel={projectPreviewOpenLabel}
        />
      ))}

      <ExploreRafa
        isLoading={isLoading}
        onExpandedChange={handleExploreExpansionChange}
        onSelect={onExploreSelect}
      />

      {isLoading && (
        <div className="chatbot-message bot typing" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <span className="chatbot-sr-only" role="status">
        {isLoading ? loadingLabel : ""}
      </span>
    </div>
  );
}
