import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Projects from "../Projects";
import AppContext from "../context/AppContext";
import { I18nProvider, LOCALES } from "../../i18n";
import { PROJECT_REVEAL_EVENT } from "../chat/sourceNavigation";

describe("project source targets", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <AppContext.Provider value={{ darkmode: { darkTheme: true } }}>
          <I18nProvider locale={LOCALES.ENGLISH}>
            <Projects locale={true} />
          </I18nProvider>
        </AppContext.Provider>,
        container
      );
    });
  });

  afterEach(() => {
    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.remove();
  });

  test("assigns stable IDs to visible project cards", () => {
    expect(container.querySelector("#project-loadbalancer")).toBeTruthy();
    expect(container.querySelector("#project-rafaglot")).toBeTruthy();
  });

  test("reveals an archived project before source navigation", () => {
    expect(container.querySelector("#project-shoptastic")).toBeFalsy();

    act(() => {
      window.dispatchEvent(
        new CustomEvent(PROJECT_REVEAL_EVENT, {
          detail: { itemId: "shoptastic" },
        })
      );
    });

    expect(container.querySelector("#project-shoptastic")).toBeTruthy();
  });
});
