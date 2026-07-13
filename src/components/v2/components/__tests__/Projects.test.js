import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Projects from "../Projects";
import AppContext from "../context/AppContext";
import { I18nProvider, LOCALES } from "../../i18n";

const findByText = (container, selector, text) =>
  Array.from(container.querySelectorAll(selector)).find(
    (element) => element.textContent === text
  );

const click = (element) => {
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
};

describe("Projects", () => {
  let container;

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
    jest.useRealTimers();
  });

  const renderProjects = ({ darkTheme = true, locale = true } = {}) => {
    act(() => {
      ReactDOM.render(
        <AppContext.Provider value={{ darkmode: { darkTheme } }}>
          <I18nProvider
            locale={locale ? LOCALES.ENGLISH : LOCALES.SPANISH}
          >
            <Projects locale={locale} />
          </I18nProvider>
        </AppContext.Provider>,
        container
      );
    });
  };

  test("renders the featured projects separately from the archive cards", () => {
    renderProjects();

    expect(findByText(container, "h2", "Featured Work")).toBeTruthy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(2);
    expect(container.querySelectorAll(".cardv2")).toHaveLength(10);
    expect(
      Array.from(container.querySelectorAll(".cardv2 h2")).map(
        (heading) => heading.textContent
      )
    ).not.toEqual(expect.arrayContaining(["RafaGlot!", "EO Pages"]));
  });

  test("filters featured and archive projects by exact category", () => {
    renderProjects();

    click(findByText(container, "button", "AI"));

    expect(container.querySelectorAll(".featured-project")).toHaveLength(1);
    expect(container.querySelectorAll(".cardv2")).toHaveLength(0);
    expect(findByText(container, "h3", "RafaGlot!")).toBeTruthy();

    click(findByText(container, "button", "Mobile"));

    expect(findByText(container, "h2", "Featured Work")).toBeFalsy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(0);
    expect(container.querySelectorAll(".cardv2")).toHaveLength(1);
    expect(findByText(container, "h2", "Sell it")).toBeTruthy();
  });

  test("exposes accessible selected states for the filter buttons", () => {
    renderProjects();
    const allFilter = findByText(container, "button", "All");
    const webFilter = findByText(container, "button", "Web");

    expect(allFilter).toHaveAttribute("aria-pressed", "true");
    expect(webFilter).toHaveAttribute("aria-pressed", "false");

    click(webFilter);

    expect(allFilter).toHaveAttribute("aria-pressed", "false");
    expect(webFilter).toHaveAttribute("aria-pressed", "true");
  });

  test("renders only the external links available for a featured project", () => {
    renderProjects();
    const eoPagesHeading = findByText(container, "h3", "EO Pages");
    const eoPagesArticle = eoPagesHeading.closest("article");

    expect(
      eoPagesArticle.querySelector('a[aria-label="EO Pages: Document"]')
    ).toBeTruthy();
    expect(
      eoPagesArticle.querySelector('a[aria-label="EO Pages: Live Site"]')
    ).toBeFalsy();
    expect(
      eoPagesArticle.querySelector('a[aria-label="EO Pages: Code"]')
    ).toBeFalsy();
    expect(
      eoPagesArticle.querySelector('a[aria-label="EO Pages: Video"]')
    ).toBeFalsy();
  });

  test("renders the Stage 2 controls in Spanish", () => {
    renderProjects({ locale: false });

    expect(findByText(container, "button", "Todos")).toBeTruthy();
    expect(findByText(container, "button", "Móvil")).toBeTruthy();
    expect(findByText(container, "h2", "Trabajo Destacado")).toBeTruthy();
    expect(
      container.querySelector('a[aria-label="RafaGlot!: Sitio Web"]')
    ).toBeTruthy();
  });
});
