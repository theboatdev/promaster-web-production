/** Sanity-compatible document shapes for future CMS integration. */

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type SanityImageAsset = {
  _ref: string;
  _type: "reference";
};

export type SanityImage = {
  _type: "image";
  asset: SanityImageAsset;
  alt?: string;
};

export type SanityFile = {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
};

export type ProductCategoryDocument = {
  _type: "productCategory";
  _id: string;
  title: string;
  /** Shorter label for grid cards; falls back to title when omitted. */
  shortTitle?: string;
  slug: SanitySlug;
  description: string;
  image: SanityImage;
  sortOrder?: number;
};

export type ProductDocument = {
  _type: "product";
  _id: string;
  name: string;
  slug: SanitySlug;
  category: {
    _ref: string;
    _type: "reference";
  };
  description?: string;
  image?: SanityImage;
  features?: string[];
  specifications?: {
    coverage?: string;
    potLife?: string;
    packaging?: string;
    standard?: string;
    shelfLife?: string;
  };
  applications?: string[];
  certifications?: Array<{ _ref: string; _type: "reference" }>;
  resources?: Array<{ _ref: string; _type: "reference" }>;
  projects?: Array<{ _ref: string; _type: "reference" }>;
};

export type CertificationDocument = {
  _type: "certification";
  _id: string;
  abbr: string;
  name: string;
  description?: string;
  standard: "iso" | "moei" | "astm" | "en" | "bs" | "wras";
  appliesTo?: Array<{ _ref: string; _type: "reference" }>;
};

export type ResourceDocument = {
  _type: "resource";
  _id: string;
  title: string;
  type: "tds" | "sds" | "guide" | "brochure" | "test" | "case";
  product: {
    _ref: string;
    _type: "reference";
  };
  pdfFile?: SanityFile;
  releaseDate?: string;
  tags?: string[];
};

export type ProjectDocument = {
  _type: "project";
  _id: string;
  name: string;
  slug: SanitySlug;
  location?: string;
  year?: number;
  projectType?: string;
  description?: string;
  image?: SanityImage;
  products?: Array<{ _ref: string; _type: "reference" }>;
  certifications?: Array<{ _ref: string; _type: "reference" }>;
  clientRef?: string;
};

/** Union of all document types */
export type SanityDocument =
  | ProductCategoryDocument
  | ProductDocument
  | CertificationDocument
  | ResourceDocument
  | ProjectDocument;
