import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectListing from "@/components/projects/listing/ProjectListing";
import { getAllProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "All Projects | Pro Master Construction Products",
  description:
    "Browse landmark construction projects across the UAE and GCC where Pro Master products were specified and applied.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Header />

      <main className="page-main page-main--bg page-main--category-listing">
        <header className="category-listing-header">
          <p className="mb-3 font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
            Projects
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            All Projects
          </h1>
          <p className="max-w-3xl text-sm leading-[1.7] text-[var(--black)]">
            Specified and applied on landmark construction projects across the
            UAE and GCC. Filter by type, location, or year.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pm-red)] transition-opacity hover:opacity-75"
          >
            ← Back to home
          </Link>
        </header>

        <ProjectListing projects={projects} />
      </main>

      <Footer />
    </>
  );
}
