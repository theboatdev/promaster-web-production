export type ProductImage = {
  alt: string;
  url?: string;
};

export type ProductListItem = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  applicationAreas: string[];
  packaging: string[];
  standards: string[];
  image: ProductImage;
  createdAt: string;
};

export type ProductSortOption = "name-asc" | "name-desc" | "sku-asc" | "newest";

export type ProductCategoryOption = {
  slug: string;
  label: string;
};

export type ProductFilterState = {
  categories: string[];
  applicationAreas: string[];
  packaging: string[];
  standards: string[];
};

export type ProductFilterOptions = {
  applicationAreas: string[];
  packaging: string[];
  standards: string[];
};

export type ProductListingQuery = {
  search: string;
  sort: ProductSortOption;
  filters: ProductFilterState;
  page: number;
  pageSize: number;
};

export type ProductListingResult = {
  items: ProductListItem[];
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export type ProductDownloadType = "tds" | "sds" | "brochure" | "manual" | "guide";

export type ProductDownload = {
  id: string;
  label: string;
  type: ProductDownloadType;
  url: string;
  fileSize?: string;
};

export type ProductSpecification = {
  key: string;
  value: string;
};

export type ProductDetail = ProductListItem & {
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  images: ProductImage[];
  downloads: ProductDownload[];
};
