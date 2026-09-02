import React from "react";

const ChatComposer = React.forwardRef(function ChatComposer({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder,
  sendLabel,
}, inputRef) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="chatbot-footer" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
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
});

export default ChatComposer;
