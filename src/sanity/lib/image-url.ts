import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

/**
 * Build Sanity image URLs
 * Usage: urlFor(imageAsset).width(800).height(600).url()
 */
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Get optimized image URL for a Sanity image
 * @param image - Sanity image object
 * @param width - Optional width (for responsive images)
 * @param height - Optional height (for aspect ratio)
 * @returns Complete image URL
 */
export function getSanityImageUrl(
  image: any,
  options?: {
    width?: number
    height?: number
    quality?: number
    fit?: 'max' | 'scale' | 'crop' | 'fill'
  }
) {
  if (!image?.asset?._ref) return null

  // Validate that _ref is a properly formatted Sanity asset reference
  // Expected format: "image-{id}-{width}x{height}-{format}"
  const refPattern = /^image-[a-zA-Z0-9]+-\d+x\d+-\w+$/
  if (!refPattern.test(image.asset._ref)) return null

  try {
    let url = urlFor(image.asset)

    if (options?.width) url = url.width(options.width)
    if (options?.height) url = url.height(options.height)
    if (options?.quality) url = url.quality(options.quality)
    if (options?.fit) url = url.fit(options.fit)

    return url.url()
  } catch {
    return null
  }
}

/**
 * Get image with responsive srcSet
 * Useful for Next.js Image component
 */
export function getResponsiveImageUrl(image: any, maxWidth = 800) {
  if (!image?.asset?._ref) return null

  return {
    src: urlFor(image.asset).width(maxWidth).url(),
    srcSet: [
      `${urlFor(image.asset).width(320).url()} 320w`,
      `${urlFor(image.asset).width(640).url()} 640w`,
      `${urlFor(image.asset).width(maxWidth).url()} ${maxWidth}w`,
    ].join(', '),
    width: maxWidth,
    alt: image.alt || 'Image',
  }
}
