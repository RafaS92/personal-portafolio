const SOURCE_SECTION_IDS = Object.freeze({
  profile: "About-v2",
  education: "About-v2",
  skill: "Technologies-v2",
  experience: "About-v2",
  service: "Services-v2",
  project: "Projects-v2",
  resume: "Other-v2",
  contact: "Contact-v2",
});

const PROJECT_REVEAL_EVENT = "portfolio:reveal-project";
const NAVIGATION_GAP_PX = 20;
const PROFILE_TITLE_IDS = Object.freeze([
  "about-title-responsive",
  "about-title-desktop",
]);
const SKILLS_TITLE_ID = "skills-title";
const SOURCE_TITLE_IDS = Object.freeze({
  profile: PROFILE_TITLE_IDS,
  education: PROFILE_TITLE_IDS,
  experience: PROFILE_TITLE_IDS,
  skill: [SKILLS_TITLE_ID],
  service: ["services-title"],
  resume: ["other-title"],
  contact: ["contact-title"],
});

function getCandidateTargetIds(source) {
  if (!source) return [];

  const fallbackSectionId = SOURCE_SECTION_IDS[source.contentType];
  if (source.contentType === "project" && source.itemId) {
    return [
      `project-title-${source.itemId}`,
      `project-${source.itemId}`,
      "projects-title",
      fallbackSectionId,
    ];
  }

  return [
    ...(SOURCE_TITLE_IDS[source.contentType] ?? []),
    source.itemId,
    fallbackSectionId,
  ].filter(Boolean);
}

function nextFrame(windowRef) {
  return new Promise((resolve) => {
    if (typeof windowRef.requestAnimationFrame === "function") {
      windowRef.requestAnimationFrame(resolve);
    } else {
      windowRef.setTimeout(resolve, 0);
    }
  });
}

function getDocumentOffsetTop(element) {
  let offsetTop = 0;
  let currentElement = element;

  while (currentElement) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent;
  }

  return offsetTop;
}

export async function navigateToSource(
  source,
  {
    documentRef = document,
    windowRef = window,
    isMobile = false,
    onMobileNavigate,
  } = {}
) {
  if (!source) return false;

  if (source.contentType === "project" && source.itemId) {
    windowRef.dispatchEvent(
      new windowRef.CustomEvent(PROJECT_REVEAL_EVENT, {
        detail: { itemId: source.itemId },
      })
    );
  }

  if (isMobile) onMobileNavigate?.();

  await nextFrame(windowRef);
  await nextFrame(windowRef);

  const candidateTargets = getCandidateTargetIds(source)
    .map((id) => documentRef.getElementById(id))
    .filter(Boolean);
  const target =
    candidateTargets.find(
      (candidate) => windowRef.getComputedStyle?.(candidate).display !== "none"
    ) || candidateTargets[0];
  if (!target) return false;

  const prefersReducedMotion =
    windowRef.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const navbar = documentRef.querySelector?.(".navbarv2, .nav__white");
  const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
  const targetTop = getDocumentOffsetTop(target);

  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  windowRef.scrollTo({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    top: Math.max(0, targetTop - navbarHeight - NAVIGATION_GAP_PX),
  });

  return true;
}

export {
  getCandidateTargetIds,
  getDocumentOffsetTop,
  NAVIGATION_GAP_PX,
  PROFILE_TITLE_IDS,
  SKILLS_TITLE_ID,
  SOURCE_TITLE_IDS,
  PROJECT_REVEAL_EVENT,
  SOURCE_SECTION_IDS,
};
