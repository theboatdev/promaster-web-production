"use client";

import { useEffect, useState } from "react";
import type {
  ProductCategoryOption,
  ProductFilterOptions,
  ProductFilterState,
  ProductSortOption,
} from "@/types/product";
import { PRODUCT_SORT_LABELS, toggleFilterValue } from "@/lib/products/listing";

type SidebarProps = {
  search: string;
  sort: ProductSortOption;
  filters: ProductFilterState;
  filterOptions: ProductFilterOptions;
  categoryOptions: ProductCategoryOption[];
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSortOption) => void;
  onFiltersChange: (filters: ProductFilterState) => void;
  onClearFilters: () => void;
};

type FilterSectionProps = {
  title: string;
  group: keyof ProductFilterState;
  options: string[];
  selected: string[];
  onToggle: (group: keyof ProductFilterState, value: string) => void;
};

function CategoryFilterSection({
  options,
  selected,
  onToggle,
}: {
  options: ProductCategoryOption[];
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(selected.length > 0);

  useEffect(() => {
    if (selected.length > 0) {
      setIsOpen(true);
    }
  }, [selected.length]);

  if (options.length === 0) return null;

  return (
    <div
      className={`filter-sidebar__accordion-item${isOpen ? " filter-sidebar__accordion-item--open" : ""}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="filter-sidebar__accordion-trigger"
        aria-expanded={isOpen}
      >
        <span className="filter-sidebar__accordion-title">Category</span>

        <span className="filter-sidebar__accordion-meta">
          {selected.length > 0 && (
            <span className="filter-sidebar__badge">{selected.length}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter-sidebar__chevron"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div className="filter-sidebar__accordion-panel">
        <div className="filter-sidebar__accordion-content">
          <ul className="filter-sidebar__options">
            {options.map((option) => {
              const checked = selected.includes(option.slug);
              const id = `categories-${option.slug}`;

              return (
                <li key={option.slug}>
                  <label htmlFor={id} className="filter-sidebar__option">
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(option.slug)}
                      className="filter-sidebar__checkbox"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  group,
  options,
  selected,
  onToggle,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(selected.length > 0);

  useEffect(() => {
    if (selected.length > 0) {
      setIsOpen(true);
    }
  }, [selected.length]);

  if (options.length === 0) return null;

  return (
    <div
      className={`filter-sidebar__accordion-item${isOpen ? " filter-sidebar__accordion-item--open" : ""}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="filter-sidebar__accordion-trigger"
        aria-expanded={isOpen}
      >
        <span className="filter-sidebar__accordion-title">{title}</span>

        <span className="filter-sidebar__accordion-meta">
          {selected.length > 0 && (
            <span className="filter-sidebar__badge">{selected.length}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter-sidebar__chevron"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div className="filter-sidebar__accordion-panel">
        <div className="filter-sidebar__accordion-content">
          <ul className="filter-sidebar__options">
            {options.map((option) => {
              const checked = selected.includes(option);
              const id = `${group}-${option.replace(/\s+/g, "-").toLowerCase()}`;

              return (
                <li key={option}>
                  <label htmlFor={id} className="filter-sidebar__option">
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(group, option)}
                      className="filter-sidebar__checkbox"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  search,
  sort,
  filters,
  filterOptions,
  categoryOptions,
  onSearchChange,
  onSortChange,
  onFiltersChange,
  onClearFilters,
}: SidebarProps) {
  const handleToggle = (group: keyof ProductFilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [group]: toggleFilterValue(filters[group], value),
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.applicationAreas.length +
    filters.packaging.length +
    filters.standards.length;

  return (
    <aside className="filter-sidebar custom-scrollbar">
      <div className="filter-sidebar__inner">
        {/* <div className="filter-sidebar__summary">
          <p className="filter-sidebar__summary-label">Refine results</p>
          <p className="filter-sidebar__summary-count">
            {totalResults} product{totalResults === 1 ? "" : "s"} found
          </p>
          <p className="filter-sidebar__summary-hint">
            Search, sort, and filter this category
          </p>
        </div> */}

        <section className="filter-sidebar__section">
          <label htmlFor="product-search" className="filter-sidebar__label">
            Search
          </label>
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or SKU…"
            className="filter-sidebar__input"
          />
        </section>

        <section className="filter-sidebar__section">
          <label htmlFor="product-sort" className="filter-sidebar__label">
            Sort by
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as ProductSortOption)
            }
            className="filter-sidebar__select"
          >
            {(Object.keys(PRODUCT_SORT_LABELS) as ProductSortOption[]).map(
              (option) => (
                <option key={option} value={option}>
                  {PRODUCT_SORT_LABELS[option]}
                </option>
              ),
            )}
          </select>
        </section>

        <section className="filter-sidebar__section filter-sidebar__section--filters">
          <div className="filter-sidebar__section-header">
            <div>
              <p className="filter-sidebar__label filter-sidebar__label--inline">
                Filters
              </p>
            </div>

            {(activeFilterCount > 0 || search.trim().length > 0) && (
              <button
                type="button"
                onClick={onClearFilters}
                className="filter-sidebar__clear"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="filter-sidebar__accordion">
            <CategoryFilterSection
              options={categoryOptions}
              selected={filters.categories}
              onToggle={(slug) => handleToggle("categories", slug)}
            />
            <FilterSection
              title="Application area"
              group="applicationAreas"
              options={filterOptions.applicationAreas}
              selected={filters.applicationAreas}
              onToggle={handleToggle}
            />
            <FilterSection
              title="Packaging"
              group="packaging"
              options={filterOptions.packaging}
              selected={filters.packaging}
              onToggle={handleToggle}
            />
            <FilterSection
              title="Standards"
              group="standards"
              options={filterOptions.standards}
              selected={filters.standards}
              onToggle={handleToggle}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}
