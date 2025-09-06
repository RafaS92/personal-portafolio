import React, { useState, useContext } from "react";
import AppContext from "./context/AppContext";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img alt="" src="/images/Rafa-ilustracion-white.png" />
            <h5>Rafabot</h5>
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
