import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Resume from "../Resume";
import AppContext from "../context/AppContext";
import { I18nProvider, LOCALES } from "../../i18n";

describe("Resume resources section", () => {
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

  const renderResume = (darkTheme = true) => {
    act(() => {
      ReactDOM.render(
        <AppContext.Provider value={{ darkmode: { darkTheme } }}>
          <I18nProvider locale={LOCALES.ENGLISH}>
            <Resume />
          </I18nProvider>
        </AppContext.Provider>,
        container
      );
    });
  };

  test("renders the three resources as safe external links", () => {
    renderResume();

    const links = container.querySelectorAll(".resource-card");
    expect(links).toHaveLength(3);
    expect(container).toHaveTextContent("Old Version");
    expect(container).toHaveTextContent("LinkedIn");
    expect(container).toHaveTextContent("Resume");
    expect(container.querySelector(".resource-card__arrow")).toBeNull();

    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("applies the current color theme to the section", () => {
    renderResume(false);

    expect(container.querySelector("#Other-v2")).toHaveClass(
      "resume__section-v2--light"
    );
  });
});
