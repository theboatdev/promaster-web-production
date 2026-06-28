import type {
  ProjectFilterOptions,
  ProjectFilterState,
  ProjectListItem,
  ProjectListingQuery,
  ProjectListingResult,
  ProjectSortOption,
} from "@/types/project";

export function getFilterOptions(projects: ProjectListItem[]): ProjectFilterOptions {
  const unique = (values: string[]) => [...new Set(values)].sort();

  return {
    projectTypes: unique(projects.map((p) => p.projectType).filter(Boolean)),
    locations: unique(projects.map((p) => p.location).filter(Boolean)),
    years: unique(
      projects
        .map((p) => (p.year > 0 ? String(p.year) : ""))
        .filter(Boolean),
    ).sort((a, b) => Number(b) - Number(a)),
  };
}

export function filterProjects(
  projects: ProjectListItem[],
  search: string,
  filters: ProjectFilterState
): ProjectListItem[] {
  const query = search.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesSearch =
      !query ||
      project.name.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.projectType.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesType =
      filters.projectTypes.length === 0 ||
      filters.projectTypes.includes(project.projectType);

    const matchesLocation =
      filters.locations.length === 0 ||
      filters.locations.includes(project.location);

    const matchesYear =
      filters.years.length === 0 ||
      filters.years.includes(String(project.year));

    return matchesSearch && matchesType && matchesLocation && matchesYear;
  });
}

export function sortProjects(
  projects: ProjectListItem[],
  sort: ProjectSortOption
): ProjectListItem[] {
  const sorted = [...projects];

  switch (sort) {
    case "year-asc":
      return sorted.sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "year-desc":
    default:
      return sorted.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
  }
}

export function paginateProjects<T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; totalPages: number; page: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
  };
}

export function resolveProjectListing(
  projects: ProjectListItem[],
  query: ProjectListingQuery
): ProjectListingResult {
  const filtered = filterProjects(projects, query.search, query.filters);
  const sorted = sortProjects(filtered, query.sort);
  const { items, totalPages, page } = paginateProjects(sorted, query.page, query.pageSize);

  return {
    items,
    totalItems: sorted.length,
    totalPages,
    page,
    pageSize: query.pageSize,
  };
}

export function toggleFilterValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}

export function hasActiveFilters(
  search: string,
  filters: ProjectFilterState
): boolean {
  return (
    search.trim().length > 0 ||
    filters.projectTypes.length > 0 ||
    filters.locations.length > 0 ||
    filters.years.length > 0
  );
}

export const PROJECT_SORT_LABELS: Record<ProjectSortOption, string> = {
  "year-desc": "Year (newest first)",
  "year-asc": "Year (oldest first)",
  "name-asc": "Name (A–Z)",
  "name-desc": "Name (Z–A)",
};

export function formatProjectIndex(listIndex: number, location: string): string {
  const city = location.split(",")[0]?.trim() || location || "—";
  return `${String(listIndex).padStart(2, "0")} / ${city}`;
}
