"use client";

import { useEffect, useState } from "react";
import type { ProductCategoryOption } from "@/types/product";
import type { DataSheetFilterState, DataSheetSortOption } from "@/types/resource";
import {
  DATA_SHEET_SORT_LABELS,
  hasActiveDataSheetFilters,
} from "@/lib/resources/listing";
import { toggleFilterValue } from "@/lib/products/listing";

type DataSheetSidebarProps = {
  search: string;
  sort: DataSheetSortOption;
  filters: DataSheetFilterState;
  categoryOptions: ProductCategoryOption[];
  onSearchChange: (value: string) => void;
  onSortChange: (value: DataSheetSortOption) => void;
  onFiltersChange: (filters: DataSheetFilterState) => void;
  onClearFilters: () => void;
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
              const id = `tds-categories-${option.slug}`;

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

export default function DataSheetSidebar({
  search,
  sort,
  filters,
  categoryOptions,
  onSearchChange,
  onSortChange,
  onFiltersChange,
  onClearFilters,
}: DataSheetSidebarProps) {
  const handleCategoryToggle = (slug: string) => {
    onFiltersChange({
      categories: toggleFilterValue(filters.categories, slug),
    });
  };

  const showClear = hasActiveDataSheetFilters(search, filters);

  return (
    <aside className="filter-sidebar custom-scrollbar">
      <div className="filter-sidebar__inner">
        <section className="filter-sidebar__section">
          <label htmlFor="tds-search" className="filter-sidebar__label">
            Search
          </label>
          <input
            id="tds-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by document or product…"
            className="filter-sidebar__input"
          />
        </section>

        <section className="filter-sidebar__section">
          <label htmlFor="tds-sort" className="filter-sidebar__label">
            Sort by
          </label>
          <select
            id="tds-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as DataSheetSortOption)
            }
            className="filter-sidebar__select"
          >
            {(Object.keys(DATA_SHEET_SORT_LABELS) as DataSheetSortOption[]).map(
              (option) => (
                <option key={option} value={option}>
                  {DATA_SHEET_SORT_LABELS[option]}
                </option>
              ),
            )}
          </select>
        </section>

        <section className="filter-sidebar__section filter-sidebar__section--filters">
          <div className="filter-sidebar__section-header">
            <p className="filter-sidebar__label filter-sidebar__label--inline">
              Filters
            </p>

            {showClear && (
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
              onToggle={handleCategoryToggle}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}
