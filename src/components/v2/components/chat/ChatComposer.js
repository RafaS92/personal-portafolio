import React from "react";

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder,
  sendLabel,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="chatbot-footer" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        maxLength={1000}
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit" disabled={isLoading || !value.trim()}>
        {sendLabel}
      </button>
    </form>
  );
}
