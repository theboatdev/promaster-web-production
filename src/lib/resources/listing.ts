import type {
  DataSheetFilterState,
  DataSheetListItem,
  DataSheetListingQuery,
  DataSheetListingResult,
  DataSheetSortOption,
} from "@/types/resource";
import { paginateProducts } from "@/lib/products/listing";

export const DATA_SHEET_SORT_LABELS: Record<DataSheetSortOption, string> = {
  "title-asc": "Document (A–Z)",
  "title-desc": "Document (Z–A)",
  "product-asc": "Product (A–Z)",
  newest: "Recently updated",
};

export function filterDataSheets(
  dataSheets: DataSheetListItem[],
  search: string,
  filters: DataSheetFilterState,
): DataSheetListItem[] {
  const query = search.trim().toLowerCase();

  return dataSheets.filter((sheet) => {
    const matchesSearch =
      !query ||
      sheet.title.toLowerCase().includes(query) ||
      sheet.product.name.toLowerCase().includes(query) ||
      sheet.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(sheet.product.categorySlug);

    return matchesSearch && matchesCategory;
  });
}

export function sortDataSheets(
  dataSheets: DataSheetListItem[],
  sort: DataSheetSortOption,
): DataSheetListItem[] {
  const sorted = [...dataSheets];

  switch (sort) {
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "product-asc":
      return sorted.sort((a, b) => a.product.name.localeCompare(b.product.name));
    case "newest":
      return sorted.sort((a, b) => {
        const aTime = a.releaseDateIso ? new Date(a.releaseDateIso).getTime() : 0;
        const bTime = b.releaseDateIso ? new Date(b.releaseDateIso).getTime() : 0;
        return bTime - aTime;
      });
    case "title-asc":
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export function resolveDataSheetListing(
  dataSheets: DataSheetListItem[],
  query: DataSheetListingQuery,
): DataSheetListingResult {
  const filtered = filterDataSheets(dataSheets, query.search, query.filters);
  const sorted = sortDataSheets(filtered, query.sort);
  const { items, totalPages, page } = paginateProducts(
    sorted,
    query.page,
    query.pageSize,
  );

  return {
    items,
    totalItems: sorted.length,
    totalPages,
    page,
    pageSize: query.pageSize,
  };
}

export function hasActiveDataSheetFilters(
  search: string,
  filters: DataSheetFilterState,
): boolean {
  return search.trim().length > 0 || filters.categories.length > 0;
}
