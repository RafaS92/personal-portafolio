import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../../../../services/chatApi";

const HISTORY_LIMIT = 10;

function toHistory(messages) {
  return messages
    .filter(
      (message) =>
        message.status === "sent" && message.includeInHistory !== false
    )
    .slice(-HISTORY_LIMIT)
    .map(({ role, content }) => ({ role, content }));
}

export default function useChat({ locale, welcomeMessage, errorMessage }) {
  const nextId = useRef(1);
  const inFlight = useRef(false);
  const activeController = useRef(null);
  const welcomeId = useRef("message-0");
  const [messages, setMessages] = useState(() => [
    {
      id: welcomeId.current,
      role: "assistant",
      content: welcomeMessage,
      sources: [],
      status: "sent",
      includeInHistory: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const createId = useCallback(() => {
    const id = `message-${nextId.current}`;
    nextId.current += 1;
    return id;
  }, []);

  useEffect(() => {
    setMessages((current) =>
      current.map((message) =>
        message.id === welcomeId.current
          ? { ...message, content: welcomeMessage }
          : message
      )
    );
  }, [welcomeMessage]);

  useEffect(
    () => () => {
      activeController.current?.abort();
    },
    []
  );

  const requestAnswer = useCallback(
    async ({ content, history, userMessageId, errorMessageId }) => {
      if (inFlight.current) return;

      inFlight.current = true;
      setIsLoading(true);
      const controller = new AbortController();
      activeController.current = controller;

      if (errorMessageId) {
        setMessages((current) =>
          current
            .filter((message) => message.id !== errorMessageId)
            .map((message) =>
              message.id === userMessageId
                ? { ...message, status: "pending" }
                : message
            )
        );
      }

      try {
        const response = await sendChatMessage(
          { message: content, locale, history },
          { signal: controller.signal }
        );

        setMessages((current) => [
          ...current.map((message) =>
            message.id === userMessageId
              ? { ...message, status: "sent", includeInHistory: true }
              : message
          ),
          {
            id: createId(),
            role: "assistant",
            content: response.content,
            sources: response.sources,
            status: "sent",
            includeInHistory: true,
          },
        ]);
      } catch (error) {
        if (controller.signal.aborted) return;

        setMessages((current) => [
          ...current.map((message) =>
            message.id === userMessageId
              ? { ...message, status: "failed", includeInHistory: false }
              : message
          ),
          {
            id: createId(),
            role: "assistant",
            content: errorMessage,
            sources: [],
            status: "error",
            includeInHistory: false,
            retry: { content, history, userMessageId },
          },
        ]);
      } finally {
        if (activeController.current === controller) {
          activeController.current = null;
          inFlight.current = false;
          setIsLoading(false);
        }
      }
    },
    [createId, errorMessage, locale]
  );

  const sendMessage = useCallback(
    (value) => {
      const content = value.trim();
      if (!content || inFlight.current) return false;

      const history = toHistory(messages);
      const userMessageId = createId();
      setMessages((current) => [
        ...current,
        {
          id: userMessageId,
          role: "user",
          content,
          sources: [],
          status: "pending",
          includeInHistory: false,
        },
      ]);
      requestAnswer({ content, history, userMessageId });
      return true;
    },
    [createId, messages, requestAnswer]
  );

  const retryMessage = useCallback(
    (message) => {
      if (!message.retry || inFlight.current) return;
      requestAnswer({ ...message.retry, errorMessageId: message.id });
    },
    [requestAnswer]
  );

  return { messages, isLoading, sendMessage, retryMessage };
}

export { HISTORY_LIMIT, toHistory };
