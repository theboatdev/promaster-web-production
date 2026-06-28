import type {
  ProjectCertification,
  ProjectDetail,
  ProjectImage,
  ProjectListItem,
  ProjectProductUsed,
} from "@/types/project";
import { getSanityImageUrl } from "@/sanity/lib/image-url";
import { mentionsIso } from "@/lib/iso";

const GALLERY_LABELS = ["Overview", "Application", "Detail", "Completion"];

function deriveTags(doc: {
  projectType?: string | null;
  products?: Array<{ name?: string | null } | null> | null;
  clientRef?: string | null;
}): string[] {
  const tags: string[] = [];
  if (doc.projectType) tags.push(doc.projectType);
  for (const product of doc.products ?? []) {
    if (product?.name) tags.push(product.name);
  }
  if (doc.clientRef) tags.push(doc.clientRef);
  return [...new Set(tags)];
}

export function sanityToProjectListItem(doc: any): ProjectListItem {
  const slug = doc?.slug?.current ?? "";
  const imageUrl = getSanityImageUrl(doc?.image, {
    width: 800,
    height: 600,
    fit: "crop",
  });

  return {
    id: doc?._id ?? slug,
    name: doc?.name ?? "",
    slug,
    location: doc?.location ?? "",
    year: typeof doc?.year === "number" ? doc.year : 0,
    projectType: doc?.projectType ?? "",
    tags: deriveTags(doc),
    image: {
      alt: doc?.image?.alt ?? doc?.name ?? "",
      url: imageUrl ?? undefined,
    },
  };
}

function buildImages(project: ProjectListItem): ProjectImage[] {
  return GALLERY_LABELS.map((label, index) => ({
    alt: index === 0 ? project.image.alt || project.name : `${project.name} — ${label}`,
    url: project.image.url,
  }));
}

export function sanityToProjectDetail(doc: any): ProjectDetail {
  const list = sanityToProjectListItem(doc);

  const productsUsed: ProjectProductUsed[] = (Array.isArray(doc?.products) ? doc.products : [])
    .map((product: any): ProjectProductUsed | null => {
      const slug = product?.slug?.current ?? "";
      const categorySlug = product?.categorySlug ?? "";
      if (!product?.name || !slug) return null;
      return {
        name: product.name,
        slug,
        categorySlug,
      };
    })
    .filter((item: ProjectProductUsed | null): item is ProjectProductUsed => item !== null);

  const certifications: ProjectCertification[] = (
    Array.isArray(doc?.certifications) ? doc.certifications : []
  )
    .map((cert: any): ProjectCertification | null => {
      if (!cert?.abbr) return null;
      return {
        id: cert._id ?? cert.abbr,
        abbr: cert.abbr,
        name: cert.name ?? cert.abbr,
      };
    })
    .filter((item: ProjectCertification | null): item is ProjectCertification => item !== null)
    .filter((cert) => !mentionsIso(cert.abbr) && !mentionsIso(cert.name));

  return {
    ...list,
    description: doc?.description?.trim() || "",
    images: buildImages(list),
    productsUsed,
    certifications,
    clientRef: doc?.clientRef ?? "",
  };
}
