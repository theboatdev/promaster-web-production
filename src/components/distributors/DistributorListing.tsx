import Link from "next/link";
import type { Distributor } from "@/types/distributor";
import DistributorCard from "@/components/distributors/DistributorCard";

type DistributorListingProps = {
  distributors: Distributor[];
};

export default function DistributorListing({
  distributors,
}: DistributorListingProps) {
  if (distributors.length === 0) {
    return (
      <div className="product-grid__empty">
        <p className="mb-2 text-center font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
          No distributors listed
        </p>
        <p className="mx-auto max-w-sm text-center text-sm leading-[1.7] text-[var(--black)]">
          Our distributor network is being updated. Contact us for supply
          enquiries in your region.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 font-[family-name:var(--font)] text-[11px] uppercase tracking-[0.13em] text-[var(--black)]">
        {distributors.length}{" "}
        {distributors.length === 1 ? "distributor" : "distributors"}
      </p>

      <div className="distributors-grid">
        {distributors.map((distributor, index) => (
          <DistributorCard
            distributor={distributor}
            index={index + 1}
            key={distributor.id}
          />
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-[1.7] text-[var(--black)]">
        Interested in becoming a Pro Master distributor?{" "}
        <Link
          href="/#contact"
          className="font-bold text-[var(--pm-red)] transition-opacity hover:opacity-75"
        >
          Get in touch
        </Link>{" "}
        to discuss partnership opportunities across the GCC.
      </p>
    </div>
  );
}
