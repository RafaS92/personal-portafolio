import OpenAI from "openai";
import React, { useState, useRef, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const toggleChat = () => {
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello, I’m an AI born out of Rafa’s consciousness. I carry his thoughts, journey, and experiences — ask me anything about his trajectory.",
          fromUser: false,
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, fromUser: true }]);
    setMessage(message);

    try {
      const embedding = await createEmbedding(message);
      const match = await findNearestMatch(embedding);
    } catch (err) {
      console.error("Error in handleSend:", err);
    }
  };

  async function createEmbedding(messagge) {
    try {
      const response = await fetch(
        "http://localhost:3001/api/createEmbedding",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messagge }),
        }
      );

      const data = await response.json();
      return data.embedding;
    } catch (error) {
      console.error("Error creating embedding:", error);
      return null;
    }
  }

  async function findNearestMatch(embedding) {
    try {
      const response = await fetch(
        "http://localhost:3001/api/findNearestMatch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ embedding }),
        }
      );

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("Error finding nearest match:", error);
      return null;
    }
  }

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
