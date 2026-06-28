import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery (Optional)',
      type: 'array',
      description: 'Additional product images for the gallery. If provided, these will be shown on the product detail page.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features of this product',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({
          name: 'coverage',
          type: 'string',
          title: 'Coverage',
        }),
        defineField({
          name: 'potLife',
          type: 'string',
          title: 'Pot Life',
        }),
        defineField({
          name: 'packaging',
          type: 'string',
          title: 'Packaging',
        }),
        defineField({
          name: 'standard',
          type: 'string',
          title: 'Standard',
        }),
        defineField({
          name: 'shelfLife',
          type: 'string',
          title: 'Shelf Life',
        }),
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Applications/Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Where this product is used (e.g., "Basement Walls", "Water Tanks")',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'certification' }],
        },
      ],
    }),
    defineField({
      name: 'resources',
      title: 'Resources/Documentation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resource' }],
        },
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      image: 'image',
    },
  },
})
