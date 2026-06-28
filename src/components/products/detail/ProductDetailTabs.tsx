"use client";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Technical Specs" },
  { id: "application", label: "Application" },
  { id: "downloads", label: "Downloads" },
  { id: "inquiry", label: "Inquiry" },
] as const;

export default function ProductDetailTabs() {
  const handleTabClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerOffset = 120;
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="page-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="page-tab"
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
