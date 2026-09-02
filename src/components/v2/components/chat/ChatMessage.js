import React from "react";

export default function ChatMessage({ message, onRetry, retryLabel }) {
  return (
    <div
      className={`chatbot-message ${
        message.role === "user" ? "user" : "bot"
      }${message.status === "error" ? " error" : ""}`}
    >
      <span>{message.content}</span>
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
