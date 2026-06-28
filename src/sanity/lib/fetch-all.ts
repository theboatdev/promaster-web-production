import { client } from './client'
import {
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_DETAIL_QUERY,
  ALL_CERTIFICATIONS_QUERY,
  ALL_RESOURCES_QUERY,
  RESOURCES_BY_TYPE_QUERY,
  PRODUCT_RESOURCES_QUERY,
  ALL_PROJECTS_QUERY,
  PROJECT_DETAIL_QUERY,
} from './queries'
import type { ProductCategoryDocument } from '@/types/sanity'

/**
 * Fetch all product categories from Sanity
 * Cached and revalidated every hour
 */
export async function getProductCategories(): Promise<ProductCategoryDocument[]> {
  try {
    const categories = await client.fetch(ALL_CATEGORIES_QUERY, {}, {
      next: {
        revalidate: 10,
      },
    })



    if (!categories || !Array.isArray(categories)) return []

    // Transform Sanity response to match ProductCategoryDocument type
    return categories.map((doc: any) => ({
      _type: 'productCategory' as const,
      _id: doc._id,
      title: doc.title,
      shortTitle: doc.shortTitle,
      slug: {
        _type: 'slug' as const,
        current: doc.slug?.current ?? '',
      },
      description: doc.description ?? '',
      image: {
        _type: 'image' as const,
        asset: {
          _ref: doc.image?.asset?._ref ?? '',
          _type: 'reference' as const,
        },
        alt: doc.image?.alt ?? '',
      },
      sortOrder: doc.sortOrder ?? 0,
    }))
  } catch (error) {
    console.error('Error fetching product categories:', error)
    return []
  }
}

/**
 * Fetch a single category by slug with its products
 */
export async function getCategoryBySlug(slug: string) {
  try {
    return await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug }, {
      next: {
        revalidate: 10,
      },
    })
  } catch (error) {
    console.error(`Error fetching category with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all products
 */
export async function getAllProducts() {
  try {
    return await client.fetch(ALL_PRODUCTS_QUERY, {}, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Fetch products by category slug
 */
export async function getProductsByCategory(categorySlug: string) {
  try {
    return await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug }, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error(`Error fetching products for category "${categorySlug}":`, error)
    return []
  }
}

/**
 * Fetch single product by slug with all relations
 */
export async function getProductBySlug(productSlug: string) {
  try {
    return await client.fetch(PRODUCT_DETAIL_QUERY, { productSlug }, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error(`Error fetching product "${productSlug}":`, error)
    return null
  }
}

/**
 * Fetch all certifications
 */
export async function getAllCertifications() {
  try {
    return await client.fetch(ALL_CERTIFICATIONS_QUERY, {}, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
}

/**
 * Fetch all resources
 */
export async function getAllResources() {
  try {
    return await client.fetch(ALL_RESOURCES_QUERY, {}, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    return []
  }
}

/**
 * Fetch resources filtered by type (tds, sds, guide, etc)
 */
export async function getResourcesByType(type: string) {
  try {
    return await client.fetch(RESOURCES_BY_TYPE_QUERY, { type }, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error(`Error fetching resources of type "${type}":`, error)
    return []
  }
}

/**
 * Fetch resources for a specific product
 */
export async function getProductResources(productSlug: string) {
  try {
    return await client.fetch(PRODUCT_RESOURCES_QUERY, { productSlug }, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error(`Error fetching resources for product "${productSlug}":`, error)
    return []
  }
}

/**
 * Fetch all projects
 */
export async function getAllProjects() {
  try {
    return await client.fetch(ALL_PROJECTS_QUERY, {}, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Fetch single project by slug
 */
export async function getProjectBySlug(projectSlug: string) {
  try {
    return await client.fetch(PROJECT_DETAIL_QUERY, { projectSlug }, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    console.error(`Error fetching project "${projectSlug}":`, error)
    return null
  }
}
