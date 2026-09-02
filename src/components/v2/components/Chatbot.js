import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import AppContext from "./context/AppContext";
import ChatComposer from "./chat/ChatComposer";
import ChatMessageList from "./chat/ChatMessageList";
import useChat from "./chat/useChat";
import "./Chatbot.css";
import translate from "../i18n/translate";

export default function Chatbot({ locale = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const intl = useIntl();
  const chatRef = useRef(null);
  const contextData = useContext(AppContext);
  const darkmode = contextData.darkmode.darkTheme;
  const { messages, isLoading, sendMessage, retryMessage } = useChat({
    locale,
    welcomeMessage: intl.formatMessage({ id: "botWelcome" }),
    errorMessage: intl.formatMessage({ id: "chatError" }),
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const image = new Image();
    image.src =
      "https://landingpageimages.s3.us-east-2.amazonaws.com/Wallpaper-chat.jpg";
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (sendMessage(draft)) setDraft("");
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
            type="button"
            aria-label={intl.formatMessage({ id: "chatOpen" })}
            className={
              darkmode
                ? "chatbot-toggle icon-black"
                : "chatbot-toggle icon-white"
            }
            onClick={() => setIsOpen(true)}
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

      {isOpen && (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <div
          className="chatbot-window"
          ref={chatRef}
          role="dialog"
          aria-label={intl.formatMessage({ id: "chatDialog" })}
        >
          <div className="chatbot-header">
            <img alt="" src="/images/face-center.png" />
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label={intl.formatMessage({ id: "chatClose" })}
            >
              ✖
            </button>
          </div>

          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            onRetry={retryMessage}
            retryLabel={intl.formatMessage({ id: "chatRetry" })}
          />

          <ChatComposer
            value={draft}
            onChange={setDraft}
            onSubmit={handleSend}
            isLoading={isLoading}
            placeholder={intl.formatMessage({ id: "chatPlaceholder" })}
            sendLabel={intl.formatMessage({ id: "chatSend" })}
          />
        </div>
      )}
    </>
  );
}
