"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductCategoryOption } from "@/types/product";
import type {
  DataSheetFilterState,
  DataSheetListItem,
  DataSheetSortOption,
} from "@/types/resource";
import {
  hasActiveDataSheetFilters,
  resolveDataSheetListing,
} from "@/lib/resources/listing";
import CollapsibleFilterSidebar from "@/components/listing/CollapsibleFilterSidebar";
import DataSheetSidebar from "@/components/resources/listing/DataSheetSidebar";
import DataSheetGrid from "@/components/resources/listing/DataSheetGrid";
import Pagination from "@/components/products/listing/Pagination";
import { useResponsivePageSize } from "@/lib/useResponsivePageSize";

type DataSheetListingProps = {
  dataSheets: DataSheetListItem[];
  categoryOptions: ProductCategoryOption[];
  initialCategorySlug?: string;
  pageSize?: number;
};

function buildInitialFilters(initialCategorySlug?: string): DataSheetFilterState {
  return {
    categories: initialCategorySlug ? [initialCategorySlug] : [],
  };
}

export default function DataSheetListing({
  dataSheets,
  categoryOptions,
  initialCategorySlug,
  pageSize: pageSizeProp,
}: DataSheetListingProps) {
  const responsivePageSize = useResponsivePageSize(8, 12);
  const pageSize = pageSizeProp ?? responsivePageSize;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<DataSheetSortOption>("title-asc");
  const [filters, setFilters] = useState<DataSheetFilterState>(() =>
    buildInitialFilters(initialCategorySlug),
  );
  const [page, setPage] = useState(1);

  const listing = useMemo(
    () =>
      resolveDataSheetListing(dataSheets, {
        search,
        sort,
        filters,
        page,
        pageSize,
      }),
    [dataSheets, search, sort, filters, page, pageSize],
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
    setSort("title-asc");
    setPage(1);
  };

  const activeFilterCount =
    filters.categories.length + (search.trim() ? 1 : 0);

  return (
    <div className="category-listing">
      <CollapsibleFilterSidebar activeCount={activeFilterCount}>
        <DataSheetSidebar
          search={search}
          sort={sort}
          filters={filters}
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
        {hasActiveDataSheetFilters(search, filters) && listing.totalItems > 0 && (
          <p className="mb-6 text-[13px] leading-relaxed text-[var(--black)]">
            Filtered and sorted results.
          </p>
        )}

        <DataSheetGrid
          dataSheets={listing.items}
          totalItems={listing.totalItems}
          page={listing.page}
          pageSize={listing.pageSize}
        />

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
