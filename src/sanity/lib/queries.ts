/**
 * GROQ Queries for Sanity content fetching
 * Used with the Sanity client to retrieve structured data
 */

// ═══════════════════════════════════════════════════════════════════════
// PRODUCT CATEGORY QUERIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all product categories with image and metadata
 * Sorted by sortOrder to control display sequence
 */
export const ALL_CATEGORIES_QUERY = `
  *[_type == "productCategory"] | order(sortOrder asc) {
    _id,
    title,
    shortTitle,
    slug,
    description,
    sortOrder,
    image {
      asset {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    }
  }
`

/**
 * Fetch a single category by slug
 */
export const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "productCategory" && slug.current == $slug][0] {
    _id,
    title,
    shortTitle,
    slug,
    description,
    image {
      asset {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    products[]-> {
      _id,
      name,
      slug,
      description,
      image {
        asset {
          _ref,
          url
        },
        alt
      }
    }
  }
`

/**
 * Fetch product count for each category (useful for stats)
 */
export const CATEGORY_WITH_PRODUCT_COUNT_QUERY = `
  *[_type == "productCategory"] | order(sortOrder asc) {
    _id,
    title,
    shortTitle,
    "productCount": count(products[])
  }
`

// ═══════════════════════════════════════════════════════════════════════
// PRODUCT QUERIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all products with category reference (used for static params + sitemap-style needs)
 */
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id,
    _createdAt,
    name,
    slug,
    "category": category->{ _id, title, slug },
    description,
    image {
      asset {
        _ref,
        url
      },
      alt
    },
    applications,
    specifications,
    "certifications": certifications[]->{ abbr }
  }
`

/**
 * Fetch products by category slug — returns all fields needed by listing UI
 * (applications, specifications, certifications) plus _createdAt for sorting.
 */
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
    _id,
    _createdAt,
    name,
    slug,
    description,
    image {
      asset {
        _ref,
        url
      },
      alt
    },
    "category": category->{ title, slug },
    applications,
    specifications,
    "certifications": certifications[]->{ abbr }
  }
`

/**
 * Fetch single product with all relations
 */
export const PRODUCT_DETAIL_QUERY = `
  *[_type == "product" && slug.current == $productSlug][0] {
    _id,
    _createdAt,
    name,
    slug,
    description,
    image {
      asset {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    gallery[] {
      asset {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    "category": category->{_id, title, slug},
    features,
    specifications,
    applications,
    "certifications": certifications[]->{_id, abbr, name, description},
    "resources": resources[]->{_id, title, type, "fileUrl": pdfFile.asset->url},
    "relatedProjects": projects[]->{_id, name, slug, location, year, image{asset{url}, alt}}
  }
`

// ═══════════════════════════════════════════════════════════════════════
// CERTIFICATION QUERIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all certifications
 */
export const ALL_CERTIFICATIONS_QUERY = `
  *[_type == "certification"] | order(abbr asc) {
    _id,
    abbr,
    name,
    description,
    standard
  }
`

/**
 * Fetch certifications with products they validate
 */
export const CERTIFICATIONS_WITH_PRODUCTS_QUERY = `
  *[_type == "certification"] {
    _id,
    abbr,
    name,
    description,
    standard,
    "productCount": count(appliesTo[])
  }
`

// ═══════════════════════════════════════════════════════════════════════
// RESOURCE QUERIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all resources grouped by type
 */
export const ALL_RESOURCES_QUERY = `
  *[_type == "resource"] | order(releaseDate desc) {
    _id,
    title,
    type,
    "product": product->{_id, name, slug},
    "fileUrl": pdfFile.asset->url,
    releaseDate,
    tags
  }
`

/**
 * Fetch resources by type
 */
export const RESOURCES_BY_TYPE_QUERY = `
  *[_type == "resource" && type == $type] | order(releaseDate desc) {
    _id,
    title,
    type,
    "product": product->{
      _id,
      name,
      slug,
      "categorySlug": category->slug.current,
      image {
        asset { url },
        alt
      }
    },
    "fileUrl": pdfFile.asset->url,
    previewImage {
      asset { _ref, url },
      alt
    },
    releaseDate,
    tags
  }
`

/**
 * Fetch resources for a specific product
 */
export const PRODUCT_RESOURCES_QUERY = `
  *[_type == "resource" && product->slug.current == $productSlug] | order(releaseDate desc) {
    _id,
    title,
    type,
    "fileUrl": pdfFile.asset->url,
    releaseDate,
    tags
  }
`

// ═══════════════════════════════════════════════════════════════════════
// PROJECT QUERIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all projects for showcase
 */
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(year desc) {
    _id,
    name,
    slug,
    location,
    year,
    projectType,
    image {
      asset {
        _ref,
        url
      },
      alt
    },
    "products": products[]->{name, slug}
  }
`

/**
 * Fetch single project with full details
 */
export const PROJECT_DETAIL_QUERY = `
  *[_type == "project" && slug.current == $projectSlug][0] {
    _id,
    name,
    slug,
    location,
    year,
    projectType,
    description,
    image {
      asset {
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    "products": products[]->{
      _id,
      name,
      slug,
      "categorySlug": category->slug.current
    },
    "certifications": certifications[]->{_id, abbr, name},
    clientRef
  }
`
