export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
    .replace(/^-|-$/g, "") // Remove leading and trailing hyphens
    .substring(0, 100); // Limit the length
};

/**
 * Maps state abbreviation to state slug for URLs
 * Used in breadcrumbs and internal linking
 */
export const getStateSlugFromAbbreviation = (abbr: string): string => {
  const stateSlugMap: Record<string, string> = {
    de: "delaware",
    tx: "texas",
    fl: "florida",
    ca: "california",
    ga: "georgia",
    il: "illinois",
  };
  return stateSlugMap[abbr.toLowerCase()] || abbr.toLowerCase();
};
