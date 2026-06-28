"use client";

import { useEffect, useState } from "react";
import type {
  ProjectFilterOptions,
  ProjectFilterState,
  ProjectSortOption,
} from "@/types/project";
import { PROJECT_SORT_LABELS, toggleFilterValue } from "@/lib/projects/listing";

type ProjectSidebarProps = {
  search: string;
  sort: ProjectSortOption;
  filters: ProjectFilterState;
  filterOptions: ProjectFilterOptions;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProjectSortOption) => void;
  onFiltersChange: (filters: ProjectFilterState) => void;
  onClearFilters: () => void;
};

type FilterSectionProps = {
  title: string;
  group: keyof ProjectFilterState;
  options: string[];
  selected: string[];
  onToggle: (group: keyof ProjectFilterState, value: string) => void;
};

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

export default function ProjectSidebar({
  search,
  sort,
  filters,
  filterOptions,
  onSearchChange,
  onSortChange,
  onFiltersChange,
  onClearFilters,
}: ProjectSidebarProps) {
  const handleToggle = (group: keyof ProjectFilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [group]: toggleFilterValue(filters[group], value),
    });
  };

  const activeFilterCount =
    filters.projectTypes.length +
    filters.locations.length +
    filters.years.length;

  return (
    <aside className="filter-sidebar custom-scrollbar">
      <div className="filter-sidebar__inner">
        <section className="filter-sidebar__section">
          <label htmlFor="project-search" className="filter-sidebar__label">
            Search
          </label>
          <input
            id="project-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or location…"
            className="filter-sidebar__input"
          />
        </section>

        <section className="filter-sidebar__section">
          <label htmlFor="project-sort" className="filter-sidebar__label">
            Sort by
          </label>
          <select
            id="project-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as ProjectSortOption)
            }
            className="filter-sidebar__select"
          >
            {(Object.keys(PROJECT_SORT_LABELS) as ProjectSortOption[]).map(
              (option) => (
                <option key={option} value={option}>
                  {PROJECT_SORT_LABELS[option]}
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
            <FilterSection
              title="Type"
              group="projectTypes"
              options={filterOptions.projectTypes}
              selected={filters.projectTypes}
              onToggle={handleToggle}
            />
            <FilterSection
              title="Location"
              group="locations"
              options={filterOptions.locations}
              selected={filters.locations}
              onToggle={handleToggle}
            />
            <FilterSection
              title="Year"
              group="years"
              options={filterOptions.years}
              selected={filters.years}
              onToggle={handleToggle}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}
