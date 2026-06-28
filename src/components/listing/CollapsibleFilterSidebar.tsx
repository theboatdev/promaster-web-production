"use client";

import { useState } from "react";

type CollapsibleFilterSidebarProps = {
  children: React.ReactNode;
  activeCount?: number;
};

export default function CollapsibleFilterSidebar({
  children,
  activeCount = 0,
}: CollapsibleFilterSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`listing-filters${open ? " listing-filters--open" : ""}`}>
      <button
        type="button"
        className="listing-filters__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="listing-filters__toggle-label">Search &amp; Filters</span>
        {activeCount > 0 && (
          <span className="listing-filters__badge">{activeCount}</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="listing-filters__chevron"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="listing-filters__panel">{children}</div>
    </div>
  );
}
