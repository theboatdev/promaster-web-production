import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DataSheetListing from "@/components/resources/listing/DataSheetListing";
import { getProductCategories } from "@/data/productCategories";
import { getTechnicalDataSheets } from "@/data/resources";
import type { ProductCategoryOption } from "@/types/product";

export const metadata: Metadata = {
  title: "Technical Data Sheets | Pro Master Construction Products",
  description:
    "Browse and download technical data sheets for the full Pro Master product range. Composition, properties, application method, and performance data.",
};

type TechnicalDataSheetsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function TechnicalDataSheetsPage({
  searchParams,
}: TechnicalDataSheetsPageProps) {
  const { category: categoryParam } = await searchParams;
  const [dataSheets, categories] = await Promise.all([
    getTechnicalDataSheets(),
    getProductCategories(),
  ]);

  const categoryOptions: ProductCategoryOption[] = [...categories]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((category) => ({
      slug: category.slug.current,
      label: category.shortTitle ?? category.title,
    }));

  const initialCategorySlug =
    categoryParam &&
    categoryOptions.some((option) => option.slug === categoryParam)
      ? categoryParam
      : undefined;

  return (
    <>
      <Header />

      <main className="page-main page-main--bg page-main--category-listing">
        <header className="category-listing-header">
          <p className="mb-3 font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
            Document Library
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            Technical Data Sheets
          </h1>
          <p className="max-w-3xl text-sm leading-[1.7] text-[var(--black)]">
            Product composition, mechanical properties, application method, mixing
            ratios, and performance data. All documents are free to download — no
            sign-up required.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pm-red)] transition-opacity hover:opacity-75"
          >
            ← Back to home
          </Link>
        </header>

        <DataSheetListing
          dataSheets={dataSheets}
          categoryOptions={categoryOptions}
          initialCategorySlug={initialCategorySlug}
        />
      </main>

      <Footer />
    </>
  );
}
