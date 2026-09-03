import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIntl } from "react-intl";
import AppContext from "./context/AppContext";
import ChatComposer from "./chat/ChatComposer";
import ChatMessageList from "./chat/ChatMessageList";
import useChat from "./chat/useChat";
import { navigateToSource } from "./chat/sourceNavigation";
import "./Chatbot.css";
import translate from "../i18n/translate";

const MOBILE_QUERY =
  "(max-width: 640px), (max-height: 500px) and (max-width: 900px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia?.(MOBILE_QUERY).matches ?? false
  );

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  return isMobile;
}

export default function Chatbot({
  locale = "en",
  isOpen: controlledIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const intl = useIntl();
  const chatRef = useRef(null);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const openerRef = useRef(null);
  const pendingSourceRef = useRef(null);
  const wasOpenRef = useRef(false);
  const contextData = useContext(AppContext);
  const darkmode = contextData.darkmode.darkTheme;
  const isMobile = useIsMobile();
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const {
    messages,
    isLoading,
    sendMessage,
    retryMessage,
  } = useChat({
    locale,
    welcomeMessage: intl.formatMessage({ id: "botWelcome" }),
    errorMessage: intl.formatMessage({ id: "chatError" }),
  });

  const setIsOpen = useCallback(
    (nextIsOpen) => {
      if (!isControlled) setInternalIsOpen(nextIsOpen);
      onOpenChange?.(nextIsOpen);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      openerRef.current = document.activeElement;
      inputRef.current?.focus();
    }

    if (!isOpen && wasOpenRef.current) {
      openerRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const chatElement = chatRef.current;
    const overlayElement = overlayRef.current;
    const visualViewport = isMobile ? window.visualViewport : null;
    const viewportProperties = [
      "--chat-viewport-top",
      "--chat-viewport-left",
      "--chat-viewport-width",
      "--chat-viewport-height",
    ];
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyRight = document.body.style.right;
    const previousBodyLeft = document.body.style.left;
    const previousBodyWidth = document.body.style.width;
    const scrollPosition = window.scrollY;
    const preventBackdropScroll = (event) => event.preventDefault();
    const syncChatToVisualViewport = () => {
      if (!visualViewport || !chatElement) return;

      chatElement.style.setProperty(
        "--chat-viewport-top",
        `${visualViewport.offsetTop}px`
      );
      chatElement.style.setProperty(
        "--chat-viewport-left",
        `${visualViewport.offsetLeft}px`
      );
      chatElement.style.setProperty(
        "--chat-viewport-width",
        `${visualViewport.width}px`
      );
      chatElement.style.setProperty(
        "--chat-viewport-height",
        `${visualViewport.height}px`
      );
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.right = "0";
    document.body.style.left = "0";
    document.body.style.width = "100%";
    overlayElement?.addEventListener("wheel", preventBackdropScroll, {
      passive: false,
    });
    overlayElement?.addEventListener("touchmove", preventBackdropScroll, {
      passive: false,
    });
    syncChatToVisualViewport();
    visualViewport?.addEventListener("resize", syncChatToVisualViewport);
    visualViewport?.addEventListener("scroll", syncChatToVisualViewport);

    return () => {
      overlayElement?.removeEventListener("wheel", preventBackdropScroll);
      overlayElement?.removeEventListener("touchmove", preventBackdropScroll);
      visualViewport?.removeEventListener("resize", syncChatToVisualViewport);
      visualViewport?.removeEventListener("scroll", syncChatToVisualViewport);
      viewportProperties.forEach((property) =>
        chatElement?.style.removeProperty(property)
      );
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.right = previousBodyRight;
      document.body.style.left = previousBodyLeft;
      document.body.style.width = previousBodyWidth;
      if (scrollPosition !== 0) window.scrollTo(0, scrollPosition);
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleDialogKeyDown = (event) => {
    if (!isMobile || event.key !== "Tab" || !chatRef.current) return;

    const focusableElements = Array.from(
      chatRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleSend = () => {
    if (sendMessage(draft)) setDraft("");
  };

  const handleSourceSelect = (source) => {
    pendingSourceRef.current = source;
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen || !pendingSourceRef.current) return;

    const source = pendingSourceRef.current;
    pendingSourceRef.current = null;
    void navigateToSource(source, { isMobile });
  }, [isMobile, isOpen]);

  return (
    <>
      <div className="chatbot-launcher-wrap" hidden={isOpen}>
          {showTooltip && !isOpen && (
            <div className="chatbot-tooltip">
              {translate("botQuestion")}
              <span className="chatbot-tooltip-arrow"></span>
            </div>
          )}
          <button
            type="button"
            aria-label={intl.formatMessage({ id: "chatOpen" })}
            className={`chatbot-toggle ${
              darkmode ? "chatbot-toggle--dark" : "chatbot-toggle--light"
            }`}
            onClick={() => setIsOpen(true)}
          >
            <img alt="" src="/images/rafa-chatbot-bust.png" />
            <span className="chatbot-toggle-status" aria-hidden="true"></span>
          </button>
      </div>

      {isOpen && (
        <div
          className={`chatbot-overlay chatbot-overlay--${
            darkmode ? "dark" : "light"
          }`}
          ref={overlayRef}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {isOpen && (
        <div
          className={`chatbot-window ${
            darkmode ? "chatbot-window--dark" : "chatbot-window--light"
          }`}
          ref={chatRef}
          role="dialog"
          aria-modal="true"
          aria-label={intl.formatMessage({ id: "chatDialog" })}
          onKeyDown={handleDialogKeyDown}
        >
          <header className="chatbot-header">
            <div className="chatbot-identity">
              <div className="chatbot-avatar">
                <span className="chatbot-avatar-image">
                  <img alt="" src="/images/rafa-chatbot-bust.png" />
                </span>
                <span className="chatbot-avatar-status" aria-hidden="true"></span>
              </div>
              <div>
                <h2>{intl.formatMessage({ id: "chatTitle" })}</h2>
                <p>{intl.formatMessage({ id: "chatStatus" })}</p>
              </div>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label={intl.formatMessage({ id: "chatClose" })}
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            onRetry={retryMessage}
            retryLabel={intl.formatMessage({ id: "chatRetry" })}
            loadingLabel={intl.formatMessage({ id: "chatLoading" })}
            onSourceSelect={handleSourceSelect}
            sourcesLabel={intl.formatMessage({ id: "chatSources" })}
            locale={locale}
            projectPreviewsLabel={intl.formatMessage({
              id: "chatProjectPreviews",
            })}
            projectPreviewOpenLabel={intl.formatMessage({
              id: "chatProjectOpen",
            })}
            projectPreviewScrollLabel={intl.formatMessage({
              id: "chatProjectScroll",
            })}
            onExploreSelect={sendMessage}
            shouldCollapseExplore={Boolean(draft.trim())}
          />

          <ChatComposer
            ref={inputRef}
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

export { MOBILE_QUERY, useIsMobile };
