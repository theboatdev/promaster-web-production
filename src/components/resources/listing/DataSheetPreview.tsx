export default function DataSheetPreview() {
  return (
    <div className="data-sheet-card__preview data-sheet-card__preview--icon" aria-hidden="true">
      <svg
        className="data-sheet-card__preview-icon"
        viewBox="0 0 48 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="2" width="40" height="56" rx="2" fill="#fff" stroke="#d7d7d7" />
        <path d="M14 14h20M14 22h20M14 30h14" stroke="#d7d7d7" strokeWidth="2" strokeLinecap="round" />
        <rect x="28" y="38" width="14" height="14" rx="2" fill="#c80000" />
        <text
          x="35"
          y="48"
          textAnchor="middle"
          fill="#fff"
          fontSize="7"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          PDF
        </text>
      </svg>
    </div>
  );
}
