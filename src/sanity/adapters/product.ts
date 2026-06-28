import type {
  ProductDetail,
  ProductDownload,
  ProductImage,
  ProductListItem,
  ProductSpecification,
} from "@/types/product";
import { getSanityImageUrl } from "@/sanity/lib/image-url";
import { mentionsIso } from "@/lib/iso";

/** Split a delimited string ("a, b; c") into trimmed, non-empty values. */
function splitList(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Derive an SKU from the slug: "pm-crystal-300" -> "PM-CRYSTAL-300". */
function deriveSku(slug?: string): string {
  return (slug ?? "").toUpperCase();
}

/** Pull the first sentence (or first 160 chars) out of a longer description. */
function deriveShortDescription(description?: string | null): string {
  if (!description) return "";
  const trimmed = description.trim();
  const firstSentence = trimmed.match(/^[^.!?\n]+[.!?]/);
  if (firstSentence) return firstSentence[0].trim();
  return trimmed.length > 160 ? `${trimmed.slice(0, 157)}...` : trimmed;
}

/**
 * Standards come from two places in the schema:
 *  - `specifications.standard` (free-form string, may be comma-separated)
 *  - `certifications[]->abbr` (referenced certification documents)
 * We merge and dedupe.
 */
function deriveStandards(
  spec?: { standard?: string | null } | null,
  certifications?: Array<{ abbr?: string | null } | null> | null
): string[] {
  const fromSpec = splitList(spec?.standard ?? undefined);
  const fromCerts = (certifications ?? [])
    .map((c) => c?.abbr ?? "")
    .filter((abbr): abbr is string => Boolean(abbr));
  return [...new Set([...fromSpec, ...fromCerts])].filter((standard) => !mentionsIso(standard));
}

/**
 * Convert a raw Sanity product document into a `ProductListItem`
 * suitable for grids, cards, filters, and search.
 */
export function sanityToProductListItem(
  doc: any,
  fallbackCategorySlug?: string
): ProductListItem {
  const slug = doc?.slug?.current ?? "";
  const categorySlug = doc?.category?.slug?.current ?? fallbackCategorySlug ?? "";
  const imageUrl = getSanityImageUrl(doc?.image, {
    width: 800,
    height: 600,
    fit: "crop",
  });

  return {
    id: doc?._id ?? `${categorySlug}-${slug}`,
    sku: deriveSku(slug),
    name: doc?.name ?? "",
    slug,
    categorySlug,
    shortDescription: deriveShortDescription(doc?.description),
    applicationAreas: Array.isArray(doc?.applications) ? doc.applications : [],
    packaging: splitList(doc?.specifications?.packaging),
    standards: deriveStandards(doc?.specifications, doc?.certifications),
    image: {
      alt: doc?.image?.alt ?? doc?.name ?? "",
      url: imageUrl ?? undefined,
    },
    createdAt: doc?._createdAt ?? new Date().toISOString(),
  };
}

/**
 * Convert a raw Sanity product document with full relations
 * (features, specifications, certifications, resources) into a `ProductDetail`.
 */
export function sanityToProductDetail(doc: any): ProductDetail {
  const list = sanityToProductListItem(doc);
  const description: string = doc?.description?.trim() || list.shortDescription;
  const features: string[] = Array.isArray(doc?.features) ? doc.features : [];

  const spec = doc?.specifications ?? {};
  const specifications: ProductSpecification[] = (
    [
      spec.coverage && { key: "Coverage", value: spec.coverage },
      spec.potLife && { key: "Pot Life", value: spec.potLife },
      spec.packaging && { key: "Packaging", value: spec.packaging },
      spec.standard && { key: "Standard", value: spec.standard },
      spec.shelfLife && { key: "Shelf Life", value: spec.shelfLife },
    ].filter(Boolean) as ProductSpecification[]
  );

  // Build images array: start with main image, then add gallery images if available
  const mainImageUrl =
    getSanityImageUrl(doc?.image, {
      width: 1600,
      fit: "max",
    }) ??
    getSanityImageUrl(doc?.image) ??
    list.image.url;
  
  const images: ProductImage[] = mainImageUrl
    ? [{ alt: list.image.alt, url: mainImageUrl }]
    : [{ alt: list.image.alt }];

  // Add gallery images if available
  if (Array.isArray(doc?.gallery) && doc.gallery.length > 0) {
    const galleryImages = doc.gallery
      .map((img: any) => {
        const url = getSanityImageUrl(img, {
          width: 1600,
          fit: "max",
        });
        return url
          ? { alt: img?.alt ?? doc?.name ?? "Product image", url }
          : null;
      })
      .filter((img: ProductImage | null): img is ProductImage => img !== null);
    
    images.push(...galleryImages);
  }

  const downloads: ProductDownload[] = (Array.isArray(doc?.resources) ? doc.resources : [])
    .map((r: any): ProductDownload | null => {
      const url: string | undefined = r?.fileUrl ?? r?.pdfFile?.asset?.url;
      if (!url) return null;
      const rawType = (r?.type as string | undefined) ?? "guide";
      const type: ProductDownload["type"] =
        rawType === "tds" ||
        rawType === "sds" ||
        rawType === "brochure" ||
        rawType === "manual" ||
        rawType === "guide"
          ? rawType
          : "guide";
      return {
        id: r?._id ?? `${list.slug}-${type}`,
        label: r?.title ?? type.toUpperCase(),
        type,
        url,
      };
    })
    .filter((d: ProductDownload | null): d is ProductDownload => d !== null);

  return {
    ...list,
    description,
    features,
    specifications,
    images,
    downloads,
  };
}
