import type { DataSheetListItem, ResourceType } from "@/types/resource";
import { getSanityImageUrl } from "@/sanity/lib/image-url";

type SanityResourceDoc = {
  _id: string;
  title?: string | null;
  type?: string | null;
  fileUrl?: string | null;
  releaseDate?: string | null;
  tags?: string[] | null;
  previewImage?: {
    asset?: { url?: string | null } | null;
    alt?: string | null;
  } | null;
  product?: {
    _id?: string;
    name?: string | null;
    slug?: { current?: string } | null;
    categorySlug?: string | null;
    image?: {
      asset?: { url?: string | null } | null;
      alt?: string | null;
    } | null;
  } | null;
};

function formatReleaseDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function sanityToDataSheetListItem(doc: SanityResourceDoc): DataSheetListItem | null {
  const product = doc.product;
  const productSlug = product?.slug?.current;
  const categorySlug = product?.categorySlug;

  if (!doc._id || !doc.title || !product?._id || !product.name || !productSlug || !categorySlug) {
    return null;
  }

  const imageUrl = getSanityImageUrl(product.image) ?? product.image?.asset?.url ?? undefined;
  const previewImageUrl =
    getSanityImageUrl(doc.previewImage) ?? doc.previewImage?.asset?.url ?? undefined;

  return {
    id: doc._id,
    title: doc.title,
    type: (doc.type ?? "tds") as ResourceType,
    product: {
      id: product._id,
      name: product.name,
      slug: productSlug,
      categorySlug,
      image: {
        alt: product.image?.alt || product.name,
        url: imageUrl,
      },
    },
    fileUrl: doc.fileUrl ?? undefined,
    previewImage: previewImageUrl
      ? {
          url: previewImageUrl,
          alt: doc.previewImage?.alt || doc.title,
        }
      : undefined,
    releaseDate: formatReleaseDate(doc.releaseDate),
    releaseDateIso: doc.releaseDate ?? undefined,
    tags: doc.tags ?? [],
  };
}
