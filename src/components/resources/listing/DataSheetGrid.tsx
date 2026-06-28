import type { DataSheetListItem } from "@/types/resource";
import DataSheetCard from "@/components/resources/listing/DataSheetCard";

type DataSheetGridProps = {
  dataSheets: DataSheetListItem[];
  totalItems: number;
  page: number;
  pageSize: number;
};

export default function DataSheetGrid({
  dataSheets,
  totalItems,
  page,
  pageSize,
}: DataSheetGridProps) {
  if (totalItems === 0) {
    return (
      <div className="product-grid__empty">
        <p className="mb-2 text-center font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
          No results
        </p>
        <p className="mx-auto max-w-sm text-center text-sm leading-[1.7] text-[var(--black)]">
          No technical data sheets match your search or filters. Try adjusting
          your criteria.
        </p>
      </div>
    );
  }

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = rangeStart + dataSheets.length - 1;

  return (
    <div>
      <p className="mb-4 font-[family-name:var(--font)] text-[11px] uppercase tracking-[0.13em] text-[var(--black)]">
        Showing {rangeStart}–{rangeEnd} of {totalItems} documents
      </p>

      <div className="data-sheet-grid">
        {dataSheets.map((dataSheet) => (
          <DataSheetCard key={dataSheet.id} dataSheet={dataSheet} />
        ))}
      </div>
    </div>
  );
}
