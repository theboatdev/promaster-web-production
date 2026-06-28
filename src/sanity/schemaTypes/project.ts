import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project/Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
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
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'e.g., Dubai Marina, UAE',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 10),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g., Waterproofing, Infrastructure, Flooring',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'products',
      title: 'Products Used',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications Met',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'certification' }],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
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
      name: 'clientRef',
      title: 'Client Reference',
      type: 'string',
      description: 'Consultant or architect name/firm',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      image: 'image',
    },
  },
})
