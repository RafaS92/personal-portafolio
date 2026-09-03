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
  projectPreviewScrollLabel,
  onExploreSelect,
  shouldCollapseExplore,
}) {
  const bodyRef = useRef(null);
  const lastMessageIdRef = useRef(null);

  const handleExploreExpansionChange = useCallback((isExpanded) => {
    if (isExpanded && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    const latestMessage = messages[messages.length - 1];

    if (
      !body ||
      !latestMessage ||
      latestMessage.id === lastMessageIdRef.current
    ) {
      return;
    }

    lastMessageIdRef.current = latestMessage.id;

    if (latestMessage.role === "assistant") {
      const latestMessageElement = Array.from(body.children).find(
        (element) =>
          element.dataset.chatMessageId === latestMessage.id
      );

      if (latestMessageElement) {
        const bodyTop = body.getBoundingClientRect().top;
        const messageTop = latestMessageElement.getBoundingClientRect().top;
        const bodyPaddingTop =
          Number.parseFloat(window.getComputedStyle(body).paddingTop) || 0;

        body.scrollTop += messageTop - bodyTop - bodyPaddingTop;
        return;
      }
    }

    body.scrollTop = body.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isLoading && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [isLoading]);

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
          projectPreviewScrollLabel={projectPreviewScrollLabel}
        />
      ))}

      <ExploreRafa
        isLoading={isLoading}
        onExpandedChange={handleExploreExpansionChange}
        onSelect={onExploreSelect}
        shouldCollapse={shouldCollapseExplore}
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
