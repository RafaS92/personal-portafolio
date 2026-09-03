const DEFAULT_TIMEOUT_MS = 30_000;
const SUPPORTED_LOCALES = new Set(["en", "es"]);
const SUPPORTED_ROLES = new Set(["user", "assistant"]);
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_HISTORY_MESSAGES = 10;

export class ChatApiError extends Error {
  constructor(message, { code, status = null, retryable = false } = {}) {
    super(message);
    this.name = "ChatApiError";
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

function getBackendUrl() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL?.trim().replace(
    /\/+$/,
    ""
  );

  if (!backendUrl) {
    throw new ChatApiError("REACT_APP_BACKEND_URL is not configured.", {
      code: "configuration_error",
    });
  }

  return backendUrl;
}

function validateRequest({ message, locale, history }) {
  if (typeof message !== "string" || !message.trim()) {
    throw new ChatApiError("A non-empty message is required.", {
      code: "validation_error",
    });
  }

  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    throw new ChatApiError(
      `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
      { code: "validation_error" }
    );
  }

  if (!SUPPORTED_LOCALES.has(locale)) {
    throw new ChatApiError('Locale must be either "en" or "es".', {
      code: "validation_error",
    });
  }

  if (!Array.isArray(history)) {
    throw new ChatApiError("Chat history must be an array.", {
      code: "validation_error",
    });
  }

  if (history.length > MAX_HISTORY_MESSAGES) {
    throw new ChatApiError(
      `Chat history must contain at most ${MAX_HISTORY_MESSAGES} messages.`,
      { code: "validation_error" }
    );
  }

  history.forEach((entry) => {
    if (
      !entry ||
      !SUPPORTED_ROLES.has(entry.role) ||
      typeof entry.content !== "string" ||
      !entry.content.trim()
    ) {
      throw new ChatApiError("Chat history contains an invalid message.", {
        code: "validation_error",
      });
    }
  });
}

function validateResponse(data) {
  if (
    typeof data?.content !== "string" ||
    !data.content.trim() ||
    !SUPPORTED_LOCALES.has(data.locale) ||
    !Array.isArray(data.sources)
  ) {
    throw new ChatApiError("The chatbot returned an invalid response.", {
      code: "invalid_response",
      retryable: true,
    });
  }

  const hasInvalidSource = data.sources.some(
    (source) =>
      !source ||
      typeof source.id !== "string" ||
      !source.id.trim() ||
      typeof source.itemId !== "string" ||
      !source.itemId.trim() ||
      typeof source.title !== "string" ||
      !source.title.trim() ||
      typeof source.contentType !== "string" ||
      !source.contentType.trim()
  );

  if (hasInvalidSource) {
    throw new ChatApiError("The chatbot returned invalid source metadata.", {
      code: "invalid_response",
      retryable: true,
    });
  }

  return {
    content: data.content.trim(),
    locale: data.locale,
    sources: data.sources,
  };
}

export async function sendChatMessage(
  { message, locale, history = [] },
  { fetchImpl = fetch, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}
) {
  validateRequest({ message, locale, history });

  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => controller.abort();

  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", abortFromCaller, { once: true });

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetchImpl(`${getBackendUrl()}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message.trim(),
        locale,
        history,
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ChatApiError(
        data?.error ?? "RafaBot could not generate a response.",
        {
          code: "http_error",
          status: response.status,
          retryable: response.status >= 500 || response.status === 429,
        }
      );
    }

    return validateResponse(data);
  } catch (error) {
    if (error instanceof ChatApiError) throw error;

    if (timedOut) {
      throw new ChatApiError("RafaBot took too long to respond.", {
        code: "timeout",
        retryable: true,
      });
    }

    if (controller.signal.aborted) {
      throw new ChatApiError("The chatbot request was cancelled.", {
        code: "cancelled",
      });
    }

    throw new ChatApiError("RafaBot is temporarily unavailable.", {
      code: "network_error",
      retryable: true,
    });
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromCaller);
  }
}

export const chatApiConfig = Object.freeze({
  timeoutMs: DEFAULT_TIMEOUT_MS,
});
