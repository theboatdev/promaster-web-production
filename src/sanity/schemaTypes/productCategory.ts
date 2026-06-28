import { defineField, defineType } from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title',
      type: 'string',
      description: 'Optional shorter version for UI display (defaults to title)',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Tagline or short description (e.g., "Crystalline, membrane & cementitious systems")',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls display order (0 = first, 1 = second, etc)',
      initialValue: 0,
    }),
    defineField({
      name: 'products',
      title: 'Products in Category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      description: 'Link products that belong to this category',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      sortOrder: 'sortOrder',
    },
    prepare({ title, image, sortOrder }) {
      return {
        title: `${title}${sortOrder !== undefined ? ` (${sortOrder})` : ''}`,
        media: image,
      }
    },
  },
})
