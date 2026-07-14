export const ALL_PROJECTS_CATEGORY = "All";

const getArchiveOrder = (project) =>
  Number.isFinite(project.archiveOrder)
    ? project.archiveOrder
    : Number.POSITIVE_INFINITY;

export const compareProjectsByArchiveOrder = (firstProject, secondProject) => {
  const firstOrder = getArchiveOrder(firstProject);
  const secondOrder = getArchiveOrder(secondProject);

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder;
  }

  return String(firstProject.id).localeCompare(String(secondProject.id));
};

export const selectProjects = (
  projects,
  selectedCategory = ALL_PROJECTS_CATEGORY
) =>
  projects
    .filter((project) => project.published)
    .filter(
      (project) =>
        selectedCategory === ALL_PROJECTS_CATEGORY ||
        project.categories.includes(selectedCategory)
    )
    .slice()
    .sort(compareProjectsByArchiveOrder);
