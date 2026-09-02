import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import Chatbot from "../Chatbot";
import AppContext from "../context/AppContext";
import { I18nProvider, LOCALES } from "../../i18n";
import { sendChatMessage } from "../../../../services/chatApi";
import { toHistory } from "../chat/useChat";

jest.mock("../../../../services/chatApi", () => ({
  sendChatMessage: jest.fn(),
}));

const response = (content, locale = "en") => ({
  content,
  locale,
  sources: [],
});

describe("Chatbot", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    sendChatMessage.mockReset();
  });

  afterEach(() => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
  });

  const renderChatbot = ({ locale = "en" } = {}) => {
    act(() => {
      ReactDOM.render(
        <AppContext.Provider value={{ darkmode: { darkTheme: true } }}>
          <I18nProvider
            locale={
              locale === "es" ? LOCALES.SPANISH : LOCALES.ENGLISH
            }
          >
            <Chatbot locale={locale} />
          </I18nProvider>
        </AppContext.Provider>,
        container
      );
    });

    const openLabel =
      locale === "es"
        ? "Abrir asistente del portafolio"
        : "Open portfolio assistant";
    act(() => {
      container
        .querySelector(`button[aria-label="${openLabel}"]`)
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  };

  const submit = (message) => {
    const input = container.querySelector(".chatbot-footer input");
    act(() => Simulate.change(input, { target: { value: message } }));
    act(() => Simulate.submit(container.querySelector(".chatbot-footer")));
  };

  const settle = async () => {
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  };

  test("sends a Spanish message through the unified chat endpoint", async () => {
    sendChatMessage.mockResolvedValue(response("Rafa usa React.", "es"));
    renderChatbot({ locale: "es" });

    submit("¿Rafa usa React?");
    await settle();

    expect(sendChatMessage).toHaveBeenCalledWith(
      {
        message: "¿Rafa usa React?",
        locale: "es",
        history: [],
      },
      { signal: expect.any(AbortSignal) }
    );
    expect(container).toHaveTextContent("Rafa usa React.");
  });

  test("includes only successful recent turns in a follow-up", async () => {
    sendChatMessage
      .mockResolvedValueOnce(response("Rafa uses React."))
      .mockResolvedValueOnce(response("He also uses Node.js."));
    renderChatbot();

    submit("Does Rafa use React?");
    await settle();
    submit("What about Node.js?");
    await settle();

    expect(sendChatMessage.mock.calls[1][0]).toEqual({
      message: "What about Node.js?",
      locale: "en",
      history: [
        { role: "user", content: "Does Rafa use React?" },
        { role: "assistant", content: "Rafa uses React." },
      ],
    });
  });

  test("retries a failed request without duplicating the user message", async () => {
    sendChatMessage
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response("The service is back."));
    renderChatbot();

    submit("Tell me about Rafa");
    await settle();
    expect(container).toHaveTextContent(
      "I couldn’t reach RafaBot. Please try again."
    );

    act(() => {
      container
        .querySelector(".chatbot-retry")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await settle();

    expect(sendChatMessage).toHaveBeenCalledTimes(2);
    expect(
      Array.from(container.querySelectorAll(".chatbot-message.user")).filter(
        (message) => message.textContent === "Tell me about Rafa"
      )
    ).toHaveLength(1);
    expect(container).toHaveTextContent("The service is back.");
  });

  test("prevents duplicate submissions while a request is pending", () => {
    sendChatMessage.mockReturnValue(new Promise(() => {}));
    renderChatbot();

    const input = container.querySelector(".chatbot-footer input");
    const form = container.querySelector(".chatbot-footer");
    act(() => Simulate.change(input, { target: { value: "Hello" } }));
    act(() => {
      Simulate.submit(form);
      Simulate.submit(form);
    });

    expect(sendChatMessage).toHaveBeenCalledTimes(1);
  });

  test("limits backend context to the 10 most recent successful messages", () => {
    const history = toHistory(
      Array.from({ length: 12 }, (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: `message ${index}`,
        status: "sent",
        includeInHistory: true,
      }))
    );

    expect(history).toHaveLength(10);
    expect(history[0].content).toBe("message 2");
    expect(history[9].content).toBe("message 11");
  });
});
