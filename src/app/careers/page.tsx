import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerListing from "@/components/careers/CareerListing";
import { getAllCareers } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers | Pro Master Construction Products",
  description:
    "Join Pro Master — UAE-based supplier of premium construction chemicals. View open roles in technical sales and quality control.",
};

export default function CareersPage() {
  const careers = getAllCareers();

  return (
    <>
      <Header />

      <main className="page-main page-main--bg page-main--category-listing">
        <header className="category-listing-header">
          <p className="mb-3 font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
            Careers
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            Open Roles
          </h1>
          <p className="careers-page__intro max-w-3xl text-sm leading-[1.7]">
            Join a UAE-based team supplying premium construction chemicals
            across the GCC. We hire for technical depth, field reliability, and
            a commitment to quality on every project.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pm-red)] transition-opacity hover:opacity-75"
          >
            ← Back to home
          </Link>
        </header>

        <div className="category-listing__content careers-listing">
          <CareerListing careers={careers} />
        </div>
      </main>

      <Footer />
    </>
  );
}
