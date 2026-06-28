import type { DataSheetListItem } from "@/types/resource";
import { getResourcesByType } from "@/sanity/lib/fetch-all";
import { sanityToDataSheetListItem } from "@/sanity/adapters/resource";
import { getAllProducts } from "@/data/products";

function buildMockTdsFromProducts(products: Awaited<ReturnType<typeof getAllProducts>>): DataSheetListItem[] {
  return products.map((product) => ({
    id: `mock-tds-${product.id}`,
    title: `${product.name} — Technical Data Sheet`,
    type: "tds" as const,
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categorySlug: product.categorySlug,
      image: product.image,
    },
    tags: [],
  }));
}

/**
 * Technical data sheets for the TDS listing page.
 * Uses Sanity when available; falls back to one TDS entry per product from mock catalog.
 */
export async function getTechnicalDataSheets(): Promise<DataSheetListItem[]> {
  try {
    const docs = await getResourcesByType("tds");
    if (Array.isArray(docs) && docs.length > 0) {
      return docs
        .map((doc: unknown) => sanityToDataSheetListItem(doc as Parameters<typeof sanityToDataSheetListItem>[0]))
        .filter((item): item is DataSheetListItem => item !== null);
    }
  } catch (error) {
    console.warn("Failed to fetch TDS resources from Sanity, using mock data", error);
  }

  const products = await getAllProducts();
  return buildMockTdsFromProducts(products);
}
