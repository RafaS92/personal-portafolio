import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessageList({
  messages,
  isLoading,
  onRetry,
  retryLabel,
  loadingLabel,
  onSourceSelect,
  sourcesLabel,
}) {
  const bodyRef = useRef(null);

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
        />
      ))}

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
