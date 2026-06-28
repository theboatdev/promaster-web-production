import type { ProductImage } from "@/types/product";

export type ResourceType =
  | "tds"
  | "sds"
  | "guide"
  | "brochure"
  | "test"
  | "case";

export type DataSheetProductRef = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  image: ProductImage;
};

export type DataSheetListItem = {
  id: string;
  title: string;
  type: ResourceType;
  product: DataSheetProductRef;
  fileUrl?: string;
  previewImage?: ProductImage;
  releaseDate?: string;
  releaseDateIso?: string;
  tags: string[];
};

export type DataSheetSortOption =
  | "title-asc"
  | "title-desc"
  | "product-asc"
  | "newest";

export type DataSheetFilterState = {
  categories: string[];
};

export type DataSheetListingQuery = {
  search: string;
  sort: DataSheetSortOption;
  filters: DataSheetFilterState;
  page: number;
  pageSize: number;
};

export type DataSheetListingResult = {
  items: DataSheetListItem[];
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
};
