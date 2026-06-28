import type {
  ProductFilterOptions,
  ProductFilterState,
  ProductListItem,
  ProductListingQuery,
  ProductListingResult,
  ProductSortOption,
} from "@/types/product";
import { withoutIsoMentions } from "@/lib/iso";

export function getFilterOptions(products: ProductListItem[]): ProductFilterOptions {
  const unique = (values: string[]) => [...new Set(values)].sort();

  return {
    applicationAreas: unique(products.flatMap((p) => p.applicationAreas)),
    packaging: unique(products.flatMap((p) => p.packaging)),
    standards: withoutIsoMentions(unique(products.flatMap((p) => p.standards))),
  };
}

export function filterProducts(
  products: ProductListItem[],
  search: string,
  filters: ProductFilterState
): ProductListItem[] {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.categorySlug);

    const matchesApplication =
      filters.applicationAreas.length === 0 ||
      filters.applicationAreas.some((area) => product.applicationAreas.includes(area));

    const matchesPackaging =
      filters.packaging.length === 0 ||
      filters.packaging.some((pkg) => product.packaging.includes(pkg));

    const matchesStandards =
      filters.standards.length === 0 ||
      filters.standards.some((standard) => product.standards.includes(standard));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesApplication &&
      matchesPackaging &&
      matchesStandards
    );
  });
}

export function sortProducts(
  products: ProductListItem[],
  sort: ProductSortOption
): ProductListItem[] {
  const sorted = [...products];

  switch (sort) {
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "sku-asc":
      return sorted.sort((a, b) => a.sku.localeCompare(b.sku));
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "name-asc":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function paginateProducts<T>(
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

export function resolveProductListing(
  products: ProductListItem[],
  query: ProductListingQuery
): ProductListingResult {
  const filtered = filterProducts(products, query.search, query.filters);
  const sorted = sortProducts(filtered, query.sort);
  const { items, totalPages, page } = paginateProducts(sorted, query.page, query.pageSize);

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
  filters: ProductFilterState
): boolean {
  return (
    search.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.applicationAreas.length > 0 ||
    filters.packaging.length > 0 ||
    filters.standards.length > 0
  );
}

export const PRODUCT_SORT_LABELS: Record<ProductSortOption, string> = {
  "name-asc": "Name (A–Z)",
  "name-desc": "Name (Z–A)",
  "sku-asc": "SKU (A–Z)",
  newest: "Newest first",
};
