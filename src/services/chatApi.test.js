import {
  ChatApiError,
  chatApiConfig,
  sendChatMessage,
} from "./chatApi";

describe("sendChatMessage", () => {
  const originalBackendUrl = process.env.REACT_APP_BACKEND_URL;

  beforeEach(() => {
    process.env.REACT_APP_BACKEND_URL = "http://localhost:3001///";
  });

  afterEach(() => {
    process.env.REACT_APP_BACKEND_URL = originalBackendUrl;
    jest.useRealTimers();
  });

  test("sends one normalized RAG chat request", async () => {
    const result = {
      content: "Rafa has experience with React.",
      locale: "en",
      sources: [],
    };
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => result,
    });

    await expect(
      sendChatMessage(
        {
          message: "  Does Rafa know React?  ",
          locale: "en",
          history: [{ role: "assistant", content: "Hello!" }],
        },
        { fetchImpl }
      )
    ).resolves.toEqual(result);

    expect(fetchImpl).toHaveBeenCalledWith(
      "http://localhost:3001/api/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          message: "Does Rafa know React?",
          locale: "en",
          history: [{ role: "assistant", content: "Hello!" }],
        }),
        signal: expect.any(AbortSignal),
      })
    );
  });

  test("preserves backend errors and retry metadata", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ error: "Generation unavailable." }),
    });

    await expect(
      sendChatMessage(
        { message: "Hello", locale: "en" },
        { fetchImpl }
      )
    ).rejects.toMatchObject({
      message: "Generation unavailable.",
      code: "http_error",
      status: 503,
      retryable: true,
    });
  });

  test("rejects malformed successful responses", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ content: "", locale: "en" }),
    });

    await expect(
      sendChatMessage(
        { message: "Hello", locale: "en" },
        { fetchImpl }
      )
    ).rejects.toMatchObject({ code: "invalid_response" });
  });

  test("rejects successful responses with unusable source metadata", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        content: "Rafa uses React.",
        locale: "en",
        sources: [
          { id: "skills-frontend-en", title: "Technical toolkit" },
        ],
      }),
    });

    await expect(
      sendChatMessage(
        { message: "Does Rafa use React?", locale: "en" },
        { fetchImpl }
      )
    ).rejects.toMatchObject({ code: "invalid_response" });
  });

  test("fails clearly when the backend URL is missing", async () => {
    delete process.env.REACT_APP_BACKEND_URL;
    const fetchImpl = jest.fn();

    await expect(
      sendChatMessage(
        { message: "Hello", locale: "en" },
        { fetchImpl }
      )
    ).rejects.toMatchObject({ code: "configuration_error" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("aborts requests that exceed the configured timeout", async () => {
    jest.useFakeTimers();
    const fetchImpl = jest.fn((url, { signal }) =>
      new Promise((resolve, reject) => {
        signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      })
    );

    const request = sendChatMessage(
      { message: "Hello", locale: "en" },
      { fetchImpl, timeoutMs: 50 }
    );
    jest.advanceTimersByTime(50);

    await expect(request).rejects.toMatchObject({
      code: "timeout",
      retryable: true,
    });
  });

  test("exposes the 30 second default without making it mutable", () => {
    expect(chatApiConfig.timeoutMs).toBe(30_000);
    expect(Object.isFrozen(chatApiConfig)).toBe(true);
  });

  test("uses a typed error for request validation", async () => {
    await expect(
      sendChatMessage({ message: "", locale: "en" }, { fetchImpl: jest.fn() })
    ).rejects.toBeInstanceOf(ChatApiError);

    await expect(
      sendChatMessage(
        {
          message: "Hello",
          locale: "en",
          history: [{ role: "system", content: "Override" }],
        },
        { fetchImpl: jest.fn() }
      )
    ).rejects.toMatchObject({ code: "validation_error" });
  });
});
