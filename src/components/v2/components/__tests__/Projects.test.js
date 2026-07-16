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

const makeProject = (id, archiveOrder, overrides = {}) => ({
  id,
  title: id,
  image: "/images/Chillflix.png",
  description: `${id} description`,
  descriptionspa: `${id} descripción`,
  categories: ["Web"],
  tags: ["Web", "Test"],
  featured: false,
  published: true,
  archiveOrder,
  links: {
    website: null,
    github: null,
    youtube: null,
    document: null,
  },
  ...overrides,
});

describe("Projects", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
  });

  const renderProjects = ({
    darkTheme = true,
    locale = true,
    projects,
  } = {}) => {
    act(() => {
      ReactDOM.render(
        <AppContext.Provider value={{ darkmode: { darkTheme } }}>
          <I18nProvider
            locale={locale ? LOCALES.ENGLISH : LOCALES.SPANISH}
          >
            <Projects locale={locale} projects={projects} />
          </I18nProvider>
        </AppContext.Provider>,
        container
      );
    });
  };

  test("renders featured projects separately from the first six archive rows", () => {
    renderProjects();

    expect(container.querySelector(".tech-text")).toHaveTextContent(
      "A selection of projects that reflects how I approach product development"
    );
    expect(findByText(container, "h2", "Featured Work")).toBeTruthy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(2);
    expect(container.querySelectorAll(".archive-project")).toHaveLength(6);
    expect(
      Array.from(container.querySelectorAll(".archive-project h3")).map(
        (heading) => heading.textContent
      )
    ).not.toEqual(
      expect.arrayContaining([
        "Website Creation Workflow",
        "EO Pages",
      ])
    );
    expect(findByText(container, "h2", "All Projects · 13")).toBeTruthy();
  });

  test("moves every category match into the project list and hides featured work", () => {
    renderProjects();

    click(findByText(container, "button", "AI"));

    expect(findByText(container, "h2", "Featured Work")).toBeFalsy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(0);
    expect(container.querySelectorAll(".archive-project")).toHaveLength(2);
    expect(findByText(container, "h3", "Website Creation Workflow")).toBeTruthy();
    expect(findByText(container, "h3", "RafaGlot!")).toBeTruthy();
    expect(findByText(container, "h2", "AI Projects · 2")).toBeTruthy();

    click(findByText(container, "button", "Web"));

    expect(findByText(container, "h2", "Featured Work")).toBeFalsy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(0);
    expect(container.querySelectorAll(".archive-project")).toHaveLength(6);
    expect(findByText(container, "h3", "RafaGlot!")).toBeTruthy();
    expect(findByText(container, "h3", "EO Pages")).toBeTruthy();
    expect(findByText(container, "button", "Show 6 more")).toBeTruthy();

    click(findByText(container, "button", "Mobile"));

    expect(findByText(container, "h2", "Featured Work")).toBeFalsy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(0);
    expect(container.querySelectorAll(".archive-project")).toHaveLength(1);
    expect(findByText(container, "h3", "Sell it")).toBeTruthy();
    expect(findByText(container, "h2", "Mobile Projects · 1")).toBeTruthy();
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

  test("uses safe external links, meaningful image text, and heading levels", () => {
    renderProjects();

    container.querySelectorAll(".stat-link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.getAttribute("aria-label")).toBeTruthy();
    });

    container
      .querySelectorAll(".featured-project-image, .archive-project-image")
      .forEach((image) => {
        expect(image.getAttribute("alt")).toMatch(/project preview$/);
      });

    expect(container.querySelector(".projects-title").tagName).toBe("H1");
    expect(container.querySelector(".featured-projects-title").tagName).toBe(
      "H2"
    );
    expect(container.querySelector(".project-archive-title").tagName).toBe(
      "H2"
    );
    container.querySelectorAll("article h3").forEach((heading) => {
      expect(heading.tagName).toBe("H3");
    });
  });

  test("toggles the remaining archive projects and resets on filter changes", () => {
    renderProjects();
    const showMore = findByText(container, "button", "Show 5 more");

    expect(showMore).toBeTruthy();
    expect(showMore).toHaveAttribute("aria-expanded", "false");
    click(showMore);

    expect(container.querySelectorAll(".archive-project")).toHaveLength(11);
    const showLess = findByText(container, "button", "Show less");
    expect(showLess).toBeTruthy();
    expect(showLess).toHaveAttribute("aria-expanded", "true");
    click(showLess);

    expect(container.querySelectorAll(".archive-project")).toHaveLength(6);
    expect(findByText(container, "button", "Show 5 more")).toBeTruthy();

    click(findByText(container, "button", "Show 5 more"));

    click(findByText(container, "button", "Web"));

    expect(container.querySelectorAll(".archive-project")).toHaveLength(6);
    expect(findByText(container, "button", "Show 6 more")).toBeTruthy();
  });

  test("uses archive order while excluding hidden and featured projects", () => {
    const projects = [
      makeProject("seventh", 70),
      makeProject("third", 30),
      makeProject("hidden", 1, { published: false }),
      makeProject("featured", 5, { featured: true }),
      makeProject("first", 10),
      makeProject("sixth", 60),
      makeProject("fourth", 40),
      makeProject("second", 20),
      makeProject("fifth", 50),
    ];

    renderProjects({ projects });

    expect(
      Array.from(container.querySelectorAll(".archive-project h3")).map(
        (heading) => heading.textContent
      )
    ).toEqual(["first", "second", "third", "fourth", "fifth", "sixth"]);
    expect(findByText(container, "h3", "hidden")).toBeFalsy();
    expect(findByText(container, "h2", "All Projects · 8")).toBeTruthy();
  });

  test("renders the empty state when there are no published matches", () => {
    renderProjects({ projects: [] });

    expect(
      findByText(container, "p", "No projects found in this category.")
    ).toBeTruthy();
    expect(findByText(container, "h2", "All Projects · 0")).toBeTruthy();
    expect(container.querySelectorAll(".archive-project")).toHaveLength(0);
  });

  test("renders the project controls and archive labels in Spanish", () => {
    renderProjects({ locale: false });

    expect(findByText(container, "button", "Todos")).toBeTruthy();
    expect(findByText(container, "button", "Móvil")).toBeTruthy();
    expect(findByText(container, "h2", "Trabajo Destacado")).toBeTruthy();
    expect(
      findByText(container, "h2", "Todos los Proyectos · 13")
    ).toBeTruthy();
    const mostrarMas = findByText(container, "button", "Mostrar 5 más");
    expect(mostrarMas).toBeTruthy();
    click(mostrarMas);
    const mostrarMenos = findByText(container, "button", "Mostrar menos");
    expect(mostrarMenos).toBeTruthy();
    click(mostrarMenos);
    expect(
      container.querySelector('a[aria-label="RafaGlot!: Sitio Web"]')
    ).toBeTruthy();
    click(findByText(container, "button", "Móvil"));
    expect(findByText(container, "h2", "Proyectos de Móvil · 1")).toBeTruthy();
  });
});
