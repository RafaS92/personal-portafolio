import OpenAI from "openai";
import React, { useState, useRef, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
import "./Chatbot.css";
import translate from "../i18n/translate";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const chatRef = useRef(null);
  const contextData = useContext(AppContext);
  const welcomeText = translate("botWelcome");
  const bodyRef = useRef(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  let darkmode = contextData.darkmode.darkTheme;

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

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          text: welcomeText,
          fromUser: false,
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, fromUser: true }];
    setMessages(newMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const embedding = await createEmbedding(message);
      const match = await findNearestMatch(embedding, message);

      setMessages([...newMessages, { text: match, fromUser: false }]);
    } catch (err) {
      console.error("Error in handleSend:", err);
    } finally {
      setIsLoading(false);
    }
  };

  async function createEmbedding(messagge) {
    try {
      const response = await fetch(`${backendUrl}/api/createEmbedding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messagge }),
      });

      const data = await response.json();
      return data.embedding;
    } catch (error) {
      console.error("Error creating embedding:", error);
      return null;
    }
  }

  async function findNearestMatch(embedding, message) {
    try {
      const response = await fetch(`${backendUrl}/api/findNearestMatch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ embedding, message }),
      });

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

  return (
    <>
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "30px",
            zIndex: 1001,
          }}
        >
          {showTooltip && (
            <div className="chatbot-tooltip">
              {translate("botQuestion")}
              <span className="chatbot-tooltip-arrow"></span>
            </div>
          )}
          <button
            className={
              darkmode
                ? "chatbot-toggle icon-black"
                : "chatbot-toggle icon-white"
            }
            onClick={toggleChat}
          >
            <img
              alt=""
              src={
                darkmode
                  ? "/images/face-center.png"
                  : "/images/face-center-dark.png"
              }
            />
          </button>
        </div>
      )}

      {isOpen && <div className="chatbot-overlay" onClick={toggleChat}></div>}

      {isOpen && (
        <div className="chatbot-window" ref={chatRef}>
          <div className="chatbot-header">
            <img alt="" src="/images/face-center.png" />
            <button className="close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.fromUser ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message bot typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
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
