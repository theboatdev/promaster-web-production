import { notFound, redirect } from "next/navigation";
import { getCategoryBySlug } from "@/data/productCategories";

type CategoryRedirectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryRedirectPage({
  params,
}: CategoryRedirectPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  redirect(`/products?category=${slug}`);
}
