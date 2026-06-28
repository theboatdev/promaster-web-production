import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DistributorListing from "@/components/distributors/DistributorListing";
import { getAllDistributors } from "@/data/distributor";

export const metadata: Metadata = {
  title: "Distributors | Pro Master Construction Products",
  description:
    "Find authorized Pro Master distributors across the UAE and GCC for construction chemicals, waterproofing, and building materials.",
};

export default function DistributorsPage() {
  const distributors = getAllDistributors();

  return (
    <>
      <Header />

      <main className="page-main page-main--bg page-main--category-listing">
        <header className="category-listing-header">
          <p className="mb-3 font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
            Distributors
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            Authorized Network
          </h1>
          <p className="max-w-3xl text-sm leading-[1.7] text-[var(--black)]">
            Pro Master products are supplied through authorized distributors
            across the UAE and GCC. Contact your local partner for product
            availability, technical support, and project submittals.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pm-red)] transition-opacity hover:opacity-75"
          >
            ← Back to home
          </Link>
        </header>

        <div className="category-listing__content distributors-listing">
          <DistributorListing distributors={distributors} />
        </div>
      </main>

      <Footer />
    </>
  );
}
