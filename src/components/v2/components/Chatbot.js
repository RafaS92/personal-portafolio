import React, { useState, useRef, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, fromUser: true }]);
    setMessage("");
    console.log("Message sent:", message);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const contextData = useContext(AppContext);

  let darkmode = contextData.darkmode.darkTheme;

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          className={
            darkmode ? "chatbot-toggle icon-black" : "chatbot-toggle icon-white"
          }
          onClick={toggleChat}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window" ref={chatRef}>
          <div className="chatbot-header">
            <img alt="" src="/images/face-center.png" />
            <button className="close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.fromUser ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
