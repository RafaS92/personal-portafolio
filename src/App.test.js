import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

jest.mock("aos", () => ({
  init: jest.fn(),
}));

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("App", () => {
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

  test("renders the portfolio and projects section", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    expect(container.textContent).toContain("RAFAEL VALDEZ");
    expect(container.querySelector("#Projects-v2")).toBeTruthy();
    expect(container.querySelectorAll(".featured-project")).toHaveLength(2);
    expect(container.querySelectorAll(".archive-project")).toHaveLength(6);
  });
});
