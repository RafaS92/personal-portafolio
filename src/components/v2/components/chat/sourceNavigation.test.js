import {
  getCandidateTargetIds,
  getDocumentOffsetTop,
  navigateToSource,
  NAVIGATION_GAP_PX,
  PROJECT_REVEAL_EVENT,
  PROFILE_TITLE_IDS,
  SKILLS_TITLE_ID,
  SOURCE_TITLE_IDS,
  SOURCE_SECTION_IDS,
} from "./sourceNavigation";

describe("source navigation", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  test.each(Object.entries(SOURCE_SECTION_IDS))(
    "maps %s sources to %s",
    (contentType, sectionId) => {
      expect(getCandidateTargetIds({ contentType })).toContain(sectionId);
    }
  );

  test("calculates document position without visual transforms", () => {
    const parent = { offsetTop: 300, offsetParent: null };
    const target = { offsetTop: 200, offsetParent: parent };

    expect(getDocumentOffsetTop(target)).toBe(500);
  });

  test.each([
    ["service", "services-title"],
    ["resume", "other-title"],
    ["contact", "contact-title"],
  ])("prioritizes the %s section title", (contentType, titleId) => {
    expect(getCandidateTargetIds({ contentType, itemId: "content" })[0]).toBe(
      titleId
    );
    expect(SOURCE_TITLE_IDS[contentType]).toContain(titleId);
  });

  test("prioritizes a project's own title", () => {
    expect(
      getCandidateTargetIds({ contentType: "project", itemId: "picpock" })[0]
    ).toBe("project-title-picpock");
  });

  test("prefers an exact item target and moves focus to it", async () => {
    const target = document.createElement("div");
    target.id = "education-flatiron";
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await expect(
      navigateToSource({
        itemId: "education-flatiron",
        contentType: "education",
      })
    ).resolves.toBe(true);

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
    });
    expect(document.activeElement).toBe(target);

    target.remove();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });

  test("navigates profile sources to the visible About title", async () => {
    const responsiveTitle = document.createElement("h1");
    responsiveTitle.id = PROFILE_TITLE_IDS[0];
    responsiveTitle.style.display = "none";
    responsiveTitle.scrollIntoView = jest.fn();
    const desktopTitle = document.createElement("h1");
    desktopTitle.id = PROFILE_TITLE_IDS[1];
    desktopTitle.scrollIntoView = jest.fn();
    const profileContent = document.createElement("div");
    profileContent.id = "profile-overview";
    profileContent.scrollIntoView = jest.fn();
    Object.defineProperty(desktopTitle, "offsetTop", { value: 500 });
    const navbar = document.createElement("nav");
    navbar.className = "navbarv2";
    navbar.getBoundingClientRect = () => ({ height: 80 });
    document.body.append(
      navbar,
      responsiveTitle,
      desktopTitle,
      profileContent
    );
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await navigateToSource({
      itemId: "profile-overview",
      contentType: "profile",
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 500 - 80 - NAVIGATION_GAP_PX,
    });
    expect(profileContent.scrollIntoView).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(desktopTitle);

    responsiveTitle.remove();
    desktopTitle.remove();
    profileContent.remove();
    navbar.remove();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });

  test("navigates skill sources to the Skills title", async () => {
    const title = document.createElement("h1");
    title.id = SKILLS_TITLE_ID;
    title.scrollIntoView = jest.fn();
    const toolkit = document.createElement("div");
    toolkit.id = "skills-toolkit";
    toolkit.scrollIntoView = jest.fn();
    document.body.append(title, toolkit);
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await navigateToSource({
      itemId: "skills-toolkit",
      contentType: "skill",
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
    });
    expect(toolkit.scrollIntoView).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(title);

    title.remove();
    toolkit.remove();
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
    expect(window.scrollTo).toHaveBeenCalled();

    window.removeEventListener(PROJECT_REVEAL_EVENT, revealListener);
    target.remove();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });
});
