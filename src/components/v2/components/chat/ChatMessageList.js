import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessageList({
  messages,
  isLoading,
  onRetry,
  retryLabel,
}) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [isLoading, messages]);

  return (
    <div className="chatbot-body" ref={bodyRef}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onRetry={onRetry}
          retryLabel={retryLabel}
        />
      ))}

      {isLoading && (
        <div className="chatbot-message bot typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
}
