export type ProjectImage = {
  alt: string;
  url?: string;
};

export type ProjectListItem = {
  id: string;
  name: string;
  slug: string;
  location: string;
  year: number;
  projectType: string;
  tags: string[];
  image: ProjectImage;
};

export type ProjectSortOption = "year-desc" | "year-asc" | "name-asc" | "name-desc";

export type ProjectFilterState = {
  projectTypes: string[];
  locations: string[];
  years: string[];
};

export type ProjectFilterOptions = {
  projectTypes: string[];
  locations: string[];
  years: string[];
};

export type ProjectListingQuery = {
  search: string;
  sort: ProjectSortOption;
  filters: ProjectFilterState;
  page: number;
  pageSize: number;
};

export type ProjectListingResult = {
  items: ProjectListItem[];
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export type ProjectProductUsed = {
  name: string;
  slug: string;
  categorySlug: string;
};

export type ProjectCertification = {
  id: string;
  abbr: string;
  name: string;
};

export type ProjectDetail = ProjectListItem & {
  description: string;
  images: ProjectImage[];
  productsUsed: ProjectProductUsed[];
  certifications: ProjectCertification[];
  clientRef: string;
};
