"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ProjectFilterState,
  ProjectListItem,
  ProjectSortOption,
} from "@/types/project";
import {
  getFilterOptions,
  hasActiveFilters,
  resolveProjectListing,
} from "@/lib/projects/listing";
import CollapsibleFilterSidebar from "@/components/listing/CollapsibleFilterSidebar";
import ProjectSidebar from "@/components/projects/listing/ProjectSidebar";
import ProjectList from "@/components/projects/listing/ProjectList";
import Pagination from "@/components/products/listing/Pagination";
import { useResponsivePageSize } from "@/lib/useResponsivePageSize";

type ProjectListingProps = {
  projects: ProjectListItem[];
  pageSize?: number;
};

const EMPTY_FILTERS: ProjectFilterState = {
  projectTypes: [],
  locations: [],
  years: [],
};

export default function ProjectListing({
  projects,
  pageSize: pageSizeProp,
}: ProjectListingProps) {
  const responsivePageSize = useResponsivePageSize(6, 8);
  const pageSize = pageSizeProp ?? responsivePageSize;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProjectSortOption>("year-desc");
  const [filters, setFilters] = useState<ProjectFilterState>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const filterOptions = useMemo(() => getFilterOptions(projects), [projects]);

  const listing = useMemo(
    () =>
      resolveProjectListing(projects, {
        search,
        sort,
        filters,
        page,
        pageSize,
      }),
    [projects, search, sort, filters, page, pageSize],
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
    setFilters(EMPTY_FILTERS);
    setSort("year-desc");
    setPage(1);
  };

  const startIndex = (listing.page - 1) * listing.pageSize;

  const activeFilterCount =
    filters.projectTypes.length +
    filters.locations.length +
    filters.years.length +
    (search.trim() ? 1 : 0);

  return (
    <div className="category-listing">
      <CollapsibleFilterSidebar activeCount={activeFilterCount}>
        <ProjectSidebar
          search={search}
          sort={sort}
          filters={filters}
          filterOptions={filterOptions}
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

        <ProjectList
          projects={listing.items}
          totalItems={listing.totalItems}
          startIndex={startIndex}
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
