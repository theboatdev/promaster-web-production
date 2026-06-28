import { defineField, defineType } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource/Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Technical Data Sheet (TDS)', value: 'tds' },
          { title: 'Safety Data Sheet (SDS)', value: 'sds' },
          { title: 'Application Guide', value: 'guide' },
          { title: 'Product Brochure', value: 'brochure' },
          { title: 'Test Report', value: 'test' },
          { title: 'Case Study', value: 'case' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Related Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description:
        'Optional cover image for listings (e.g. first page of the PDF). Auto-generated preview is used when empty.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release/Updated Date',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Help categorize and search (e.g., "waterproofing", "concrete")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      product: 'product.name',
    },
    prepare({ title, subtitle, product }) {
      return {
        title: title,
        subtitle: `${subtitle?.toUpperCase?.() || ''} - ${product || 'No product'}`,
      }
    },
  },
})
