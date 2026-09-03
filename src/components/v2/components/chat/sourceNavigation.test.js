import {
  getCandidateTargetIds,
  navigateToSource,
  PROJECT_REVEAL_EVENT,
  PROFILE_TITLE_IDS,
  SKILLS_TITLE_ID,
  SOURCE_SECTION_IDS,
} from "./sourceNavigation";

describe("source navigation", () => {
  test.each(Object.entries(SOURCE_SECTION_IDS))(
    "maps %s sources to %s",
    (contentType, sectionId) => {
      expect(getCandidateTargetIds({ contentType })).toContain(sectionId);
    }
  );

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

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
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
    document.body.append(responsiveTitle, desktopTitle, profileContent);
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => callback();

    await navigateToSource({
      itemId: "profile-overview",
      contentType: "profile",
    });

    expect(desktopTitle.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
    expect(profileContent.scrollIntoView).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(desktopTitle);

    responsiveTitle.remove();
    desktopTitle.remove();
    profileContent.remove();
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

    expect(title.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
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
    expect(target.scrollIntoView).toHaveBeenCalled();

    window.removeEventListener(PROJECT_REVEAL_EVENT, revealListener);
    target.remove();
    window.requestAnimationFrame = originalRequestAnimationFrame;
  });
});
