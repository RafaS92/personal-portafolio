import {
  getCandidateTargetIds,
  HIGHLIGHT_CLASS,
  navigateToSource,
  PROJECT_REVEAL_EVENT,
  SOURCE_SECTION_IDS,
} from "./sourceNavigation";

describe("source navigation", () => {
  test.each(Object.entries(SOURCE_SECTION_IDS))(
    "maps %s sources to %s",
    (contentType, sectionId) => {
      expect(getCandidateTargetIds({ contentType })).toContain(sectionId);
    }
  );

  test("prefers an exact item target and highlights it", async () => {
    const target = document.createElement("div");
    target.id = "education-flatiron";
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);
    const timeout = jest.spyOn(window, "setTimeout").mockImplementation(() => 1);
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await expect(
      navigateToSource({
        itemId: "education-flatiron",
        contentType: "education",
      })
    ).resolves.toBe(true);

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
    expect(target).toHaveClass(HIGHLIGHT_CLASS);
    expect(document.activeElement).toBe(target);

    target.remove();
    timeout.mockRestore();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });

  test("reveals a project and minimizes the mobile sheet", async () => {
    const target = document.createElement("article");
    target.id = "project-picpock";
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);
    const onMobileNavigate = jest.fn();
    const revealListener = jest.fn();
    window.addEventListener(PROJECT_REVEAL_EVENT, revealListener);
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await navigateToSource(
      { itemId: "picpock", contentType: "project" },
      { isMobile: true, onMobileNavigate }
    );

    expect(revealListener).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { itemId: "picpock" } })
    );
    expect(onMobileNavigate).toHaveBeenCalledTimes(1);
    expect(target.scrollIntoView).toHaveBeenCalled();

    window.removeEventListener(PROJECT_REVEAL_EVENT, revealListener);
    target.remove();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });
});
