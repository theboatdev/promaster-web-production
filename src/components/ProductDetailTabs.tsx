"use client";
import { useState } from "react";

const TABS = ["Overview", "Technical Specs", "Application", "Downloads", "Inquiry"];

export default function ProductDetailTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="page-tabs">
      {TABS.map((tab, i) => (
        <div
          key={tab}
          className={`page-tab${active === i ? " active" : ""}`}
          onClick={() => setActive(i)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
