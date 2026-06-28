import type { Career } from "@/types/career";
import CareerCard from "@/components/careers/CareerCard";

type CareerListingProps = {
  careers: Career[];
};

export default function CareerListing({ careers }: CareerListingProps) {
  if (careers.length === 0) {
    return (
      <div className="product-grid__empty">
        <p className="mb-2 text-center font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
          No open roles
        </p>
        <p className="mx-auto max-w-sm text-center text-sm leading-[1.7] careers-page__intro">
          There are no vacancies listed right now. Send a general application
          and we&apos;ll keep your profile on file.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="careers-listing__count">
        {careers.length} open {careers.length === 1 ? "position" : "positions"}
      </p>

      <div className="careers-grid">
        {careers.map((career, index) => (
          <CareerCard career={career} index={index + 1} key={career.id} />
        ))}
      </div>
    </div>
  );
}
