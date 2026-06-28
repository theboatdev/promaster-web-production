import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductListing from "@/components/products/listing/ProductListing";
import { getProductCategories } from "@/data/productCategories";
import { getAllProducts } from "@/data/products";
import type { ProductCategoryOption } from "@/types/product";

export const metadata: Metadata = {
  title: "All Products | Pro Master Construction Products",
  description:
    "Browse the full Pro Master construction chemical range — waterproofing, adhesives, repair systems, coatings, and more. Filter by category, application, and standards.",
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: categoryParam } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(),
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
            Product Range
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            All Products
          </h1>
          <p className="max-w-3xl text-sm leading-[1.7] text-[var(--black)]">
            Systems engineered for the Gulf climate. Search, sort,
            and filter the full range — or narrow by category using the sidebar.
          </p>
        </header>

        <ProductListing
          products={products}
          categoryOptions={categoryOptions}
          initialCategorySlug={initialCategorySlug}
        />
      </main>

      <Footer />
    </>
  );
}
