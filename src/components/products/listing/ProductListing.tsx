"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ProductCategoryOption,
  ProductFilterState,
  ProductListItem,
  ProductSortOption,
} from "@/types/product";
import {
  getFilterOptions,
  hasActiveFilters,
  resolveProductListing,
} from "@/lib/products/listing";
import CollapsibleFilterSidebar from "@/components/listing/CollapsibleFilterSidebar";
import Sidebar from "@/components/products/listing/Sidebar";
import ProductGrid from "@/components/products/listing/ProductGrid";
import Pagination from "@/components/products/listing/Pagination";
import { useResponsivePageSize } from "@/lib/useResponsivePageSize";

type ProductListingProps = {
  products: ProductListItem[];
  categoryOptions: ProductCategoryOption[];
  initialCategorySlug?: string;
  pageSize?: number;
};

function buildInitialFilters(initialCategorySlug?: string): ProductFilterState {
  return {
    categories: initialCategorySlug ? [initialCategorySlug] : [],
    applicationAreas: [],
    packaging: [],
    standards: [],
  };
}

export default function ProductListing({
  products,
  categoryOptions,
  initialCategorySlug,
  pageSize: pageSizeProp,
}: ProductListingProps) {
  const responsivePageSize = useResponsivePageSize(6, 9);
  const pageSize = pageSizeProp ?? responsivePageSize;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductSortOption>("name-asc");
  const [filters, setFilters] = useState<ProductFilterState>(() =>
    buildInitialFilters(initialCategorySlug),
  );
  const [page, setPage] = useState(1);

  const filterOptions = useMemo(() => getFilterOptions(products), [products]);

  const listing = useMemo(
    () =>
      resolveProductListing(products, {
        search,
        sort,
        filters,
        page,
        pageSize,
      }),
    [products, search, sort, filters, page, pageSize],
  );

  useEffect(() => {
    setPage(1);
  }, [search, sort, filters, pageSize]);

  useEffect(() => {
    if (page > listing.totalPages) {
      setPage(listing.totalPages);
    }
  }, [listing.totalPages, page]);

  const handleClearFilters = () => {
    setSearch("");
    setFilters(buildInitialFilters());
    setSort("name-asc");
    setPage(1);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.applicationAreas.length +
    filters.packaging.length +
    filters.standards.length +
    (search.trim() ? 1 : 0);

  return (
    <div className="category-listing">
      <CollapsibleFilterSidebar activeCount={activeFilterCount}>
        <Sidebar
          search={search}
          sort={sort}
          filters={filters}
          filterOptions={filterOptions}
          categoryOptions={categoryOptions}
          onSearchChange={setSearch}
          onSortChange={setSort}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </CollapsibleFilterSidebar>

      <div
        className={`category-listing__content min-w-0${listing.totalItems === 0 ? " category-listing__content--empty" : ""}`}
      >
        {hasActiveFilters(search, filters) && listing.totalItems > 0 && (
          <p className="mb-6 text-[13px] leading-relaxed text-[var(--black)]">
            Filtered and sorted results.
          </p>
        )}

        <ProductGrid products={listing.items} totalItems={listing.totalItems} />

        {listing.totalItems > 0 && (
          <Pagination
            page={listing.page}
            totalPages={listing.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
