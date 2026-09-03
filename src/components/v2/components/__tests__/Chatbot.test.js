import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import Chatbot from "../Chatbot";
import Hero from "../Hero";
import AppContext from "../context/AppContext";
import { I18nProvider, LOCALES } from "../../i18n";
import { sendChatMessage } from "../../../../services/chatApi";
import { toHistory } from "../chat/useChat";
import { navigateToSource } from "../chat/sourceNavigation";

jest.mock("../../../../services/chatApi", () => ({
  sendChatMessage: jest.fn(),
}));
jest.mock("../chat/sourceNavigation", () => ({
  navigateToSource: jest.fn(),
}));

const response = (content, locale = "en", sources = []) => ({
  content,
  locale,
  sources,
});

describe("Chatbot", () => {
  let container;
  const originalMatchMedia = window.matchMedia;
  const originalVisualViewport = window.visualViewport;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    sendChatMessage.mockReset();
    navigateToSource.mockReset();
  });

  afterEach(() => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: originalVisualViewport,
    });
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
    const openButton = container.querySelector(
      `button[aria-label="${openLabel}"]`
    );
    act(() => {
      openButton.focus();
      openButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    return openButton;
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

  test("moves focus into the panel and restores it after Escape", () => {
    const openButton = renderChatbot();

    expect(document.activeElement).toBe(
      container.querySelector(".chatbot-footer input")
    );
    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
    });

    expect(container.querySelector('[role="dialog"]')).toBeFalsy();
    expect(document.activeElement).toBe(openButton);
  });

  test("announces loading state to assistive technology", () => {
    sendChatMessage.mockReturnValue(new Promise(() => {}));
    renderChatbot();
    submit("What has Rafa built?");

    expect(container.querySelector(".chatbot-body")).toHaveAttribute(
      "aria-busy",
      "true"
    );
    expect(container.querySelector('[role="status"]')).toHaveTextContent(
      "RafaBot is thinking"
    );
  });

  test("uses a modal, scroll-locked bottom sheet on mobile", () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    renderChatbot();

    expect(container.querySelector('[role="dialog"]')).toHaveAttribute(
      "aria-modal",
      "true"
    );
    expect(window.matchMedia).toHaveBeenCalledWith(
      "(max-width: 640px), (max-height: 500px) and (max-width: 900px)"
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("follows the visual viewport when the mobile keyboard changes it", () => {
    const listeners = {};
    const visualViewport = {
      width: 390,
      height: 500,
      offsetTop: 120,
      offsetLeft: 0,
      addEventListener: jest.fn((event, listener) => {
        listeners[event] = listener;
      }),
      removeEventListener: jest.fn(),
    };
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: visualViewport,
    });
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    renderChatbot();

    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog.style.getPropertyValue("--chat-viewport-top")).toBe(
      "120px"
    );
    expect(dialog.style.getPropertyValue("--chat-viewport-width")).toBe(
      "390px"
    );
    expect(dialog.style.getPropertyValue("--chat-viewport-height")).toBe(
      "500px"
    );

    act(() => {
      visualViewport.offsetTop = 72;
      visualViewport.height = 360;
      listeners.resize();
    });

    expect(dialog.style.getPropertyValue("--chat-viewport-top")).toBe("72px");
    expect(dialog.style.getPropertyValue("--chat-viewport-height")).toBe(
      "360px"
    );
  });

  test("dims and locks the page until the desktop backdrop is clicked", () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    renderChatbot();

    const overlay = container.querySelector(".chatbot-overlay");
    expect(overlay).toBeTruthy();
    expect(container.querySelector('[role="dialog"]')).toHaveAttribute(
      "aria-modal",
      "true"
    );
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.position).toBe("fixed");

    const wheelEvent = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      deltaY: 300,
    });
    act(() => {
      overlay.dispatchEvent(wheelEvent);
    });
    expect(wheelEvent.defaultPrevented).toBe(true);

    act(() => {
      overlay.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector(".chatbot-overlay")).toBeNull();
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.position).toBe("");
  });

  test("exposes the hero Ask RafaBot action", () => {
    const onAskRafaBot = jest.fn();
    act(() => {
      ReactDOM.render(
        <I18nProvider locale={LOCALES.ENGLISH}>
          <Hero onAskRafaBot={onAskRafaBot} />
        </I18nProvider>,
        container
      );
    });

    const button = Array.from(container.querySelectorAll("button")).find(
      (candidate) => candidate.textContent.includes("Ask RafaBot")
    );
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onAskRafaBot).toHaveBeenCalledTimes(1);
  });

  test("renders deduplicated accessible source buttons", async () => {
    const source = {
      id: "skills-toolkit-frontend-en",
      itemId: "skills-toolkit",
      title: "Technical toolkit",
      contentType: "skill",
    };
    sendChatMessage.mockResolvedValue(
      response("Rafa uses React.", "en", [
        source,
        { ...source, id: "skills-toolkit-backend-en" },
      ])
    );
    renderChatbot();

    submit("Does Rafa use React?");
    await settle();

    const sourceGroup = container.querySelector(
      '[aria-label="Explore in portfolio"]'
    );
    expect(sourceGroup).toBeTruthy();
    expect(sourceGroup.querySelectorAll("button")).toHaveLength(1);

    act(() => {
      sourceGroup
        .querySelector("button")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(navigateToSource).toHaveBeenCalledWith(
      source,
      expect.objectContaining({ isMobile: false })
    );
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  test("does not render portfolio buttons for experience sources", async () => {
    sendChatMessage.mockResolvedValue(
      response("Rafa has worked across several software engineering roles.", "en", [
        {
          id: "experience-sourcemap-en",
          itemId: "experience-sourcemap",
          title: "Full Stack Developer at Sourcemap",
          contentType: "experience",
        },
        {
          id: "experience-energy-ogre-en",
          itemId: "experience-energy-ogre",
          title: "Full Stack Developer at Energy Ogre",
          contentType: "experience",
        },
      ])
    );
    renderChatbot();

    submit("Tell me about Rafa’s professional experience.");
    await settle();

    expect(container).toHaveTextContent(
      "Rafa has worked across several software engineering roles."
    );
    expect(container.querySelector(".chatbot-sources")).toBeNull();
  });

  test("renders project sources as rich preview cards", async () => {
    const source = {
      id: "loadbalancer-overview-en",
      itemId: "loadbalancer",
      title: "Load Balancer",
      contentType: "project",
    };
    sendChatMessage.mockResolvedValue(
      response("Start with Rafa’s featured load balancer.", "en", [source])
    );
    renderChatbot();

    submit("Show me Rafa’s projects");
    await settle();

    const previews = container.querySelector(
      '[aria-label="Projects from Rafa’s portfolio"]'
    );
    expect(previews).toBeTruthy();
    expect(previews).toHaveTextContent("Load Balancer");
    expect(previews).toHaveTextContent("Python");
    expect(previews.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("Load+balancer")
    );

    const openButton = previews.querySelector(
      'button[aria-label="View project: Load Balancer"]'
    );
    act(() => {
      openButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(navigateToSource).toHaveBeenCalledWith(
      source,
      expect.objectContaining({ isMobile: false })
    );
  });

  test("shows a scroll hint when project preview cards overflow", async () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientWidth"
    );
    const originalScrollWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "scrollWidth"
    );
    const isProjectList = (element) =>
      element.classList?.contains("chatbot-project-previews-list");

    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      get() {
        return isProjectList(this) ? 280 : 0;
      },
    });
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      get() {
        return isProjectList(this) ? 560 : 0;
      },
    });

    try {
      sendChatMessage.mockResolvedValue(
        response("Here are two featured projects.", "en", [
          {
            id: "loadbalancer-overview-en",
            itemId: "loadbalancer",
            title: "Load Balancer",
            contentType: "project",
          },
          {
            id: "scraper-overview-en",
            itemId: "scraper",
            title: "Scraper and API Project",
            contentType: "project",
          },
        ])
      );
      renderChatbot();

      submit("Show me Rafa’s projects");
      await settle();

      expect(
        container.querySelector(".chatbot-project-previews-scroll-hint")
      ).toHaveTextContent("Scroll");
    } finally {
      if (originalClientWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "clientWidth",
          originalClientWidth
        );
      } else {
        delete HTMLElement.prototype.clientWidth;
      }
      if (originalScrollWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "scrollWidth",
          originalScrollWidth
        );
      } else {
        delete HTMLElement.prototype.scrollWidth;
      }
    }
  });

  test("localizes project preview content in Spanish", async () => {
    const source = {
      id: "scraper-overview-es",
      itemId: "scraper",
      title: "Proyecto de Scraper y API",
      contentType: "project",
    };
    sendChatMessage.mockResolvedValue(
      response("Este es uno de los proyectos destacados.", "es", [source])
    );
    renderChatbot({ locale: "es" });

    submit("Muéstrame los proyectos de Rafa");
    await settle();

    const previews = container.querySelector(
      '[aria-label="Proyectos del portafolio de Rafa"]'
    );
    expect(previews).toHaveTextContent("Proyecto de Scraper y API");
    expect(previews).toHaveTextContent("pipeline completo de datos");
    expect(
      previews.querySelector(
        'button[aria-label="Ver proyecto: Proyecto de Scraper y API"]'
      )
    ).toBeTruthy();
  });

  test("sends Explore Rafa topic selections through the RAG endpoint", async () => {
    sendChatMessage.mockResolvedValue(
      response("Rafa’s featured projects include Load Balancer.")
    );
    renderChatbot();

    const explore = container.querySelector('[aria-label="Explore Rafa"]');
    expect(explore).toHaveTextContent("Choose a topic");

    act(() => {
      Array.from(explore.querySelectorAll("button"))
        .find((button) => button.textContent.includes("Featured projects"))
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await settle();

    expect(sendChatMessage).toHaveBeenCalledWith(
      {
        message: "Show me Rafa’s featured projects.",
        locale: "en",
        history: [],
      },
      { signal: expect.any(AbortSignal) }
    );
    expect(explore.querySelector(".chatbot-explore-toggle")).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  test("collapses Explore Rafa when the user starts typing a question", () => {
    renderChatbot();

    const explore = container.querySelector('[aria-label="Explore Rafa"]');
    const toggle = explore.querySelector(".chatbot-explore-toggle");
    const input = container.querySelector(".chatbot-footer input");
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    act(() => Simulate.change(input, { target: { value: "Who is Rafa?" } }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(explore).not.toHaveTextContent("Choose a topic");
  });

  test("localizes Explore Rafa topics in Spanish", () => {
    renderChatbot({ locale: "es" });

    const explore = container.querySelector('[aria-label="Explora a Rafa"]');
    expect(explore).toHaveTextContent("Proyectos destacados");
    expect(explore).toHaveTextContent("Habilidades técnicas");
    expect(explore).toHaveTextContent("Experiencia");
  });

  test("scrolls the chat body after Explore Rafa expands", () => {
    renderChatbot();

    const body = container.querySelector(".chatbot-body");
    const toggle = container.querySelector(".chatbot-explore-toggle");
    Object.defineProperty(body, "scrollHeight", {
      configurable: true,
      value: 800,
    });

    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    body.scrollTop = 0;
    act(() => {
      toggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(body.scrollTop).toBe(800);
  });

  test("positions a completed assistant response at its beginning", async () => {
    let resolveResponse;
    const answer =
      "Rafa has extensive professional experience building maintainable software.";
    sendChatMessage.mockReturnValue(
      new Promise((resolve) => {
        resolveResponse = resolve;
      })
    );
    renderChatbot();

    const body = container.querySelector(".chatbot-body");
    Object.defineProperty(body, "scrollHeight", {
      configurable: true,
      value: 800,
    });
    const originalGetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect;
    const rectSpy = jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function getBoundingClientRect() {
        if (this === body) return { top: 100 };
        if (this.dataset.chatMessageId === "message-2") return { top: -50 };
        return originalGetBoundingClientRect.call(this);
      });

    try {
      submit("Tell me about Rafa");
      expect(body.scrollTop).toBe(800);

      await act(async () => {
        resolveResponse(response(answer));
        await Promise.resolve();
      });

      expect(body.scrollTop).toBe(650);
    } finally {
      rectSpy.mockRestore();
    }
  });
});
