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

function getCandidateTargetIds(source) {
  if (!source) return [];

  const fallbackSectionId = SOURCE_SECTION_IDS[source.contentType];
  if (source.contentType === "project" && source.itemId) {
    return [`project-${source.itemId}`, fallbackSectionId];
  }

  return [source.itemId, fallbackSectionId].filter(Boolean);
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

  const target = getCandidateTargetIds(source)
    .map((id) => documentRef.getElementById(id))
    .find(Boolean);
  if (!target) return false;

  const prefersReducedMotion =
    windowRef.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center",
  });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });

  return true;
}

export {
  getCandidateTargetIds,
  PROJECT_REVEAL_EVENT,
  SOURCE_SECTION_IDS,
};
