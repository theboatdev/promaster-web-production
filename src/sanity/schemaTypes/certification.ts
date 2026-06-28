import { defineField, defineType } from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certification/Standard',
  type: 'document',
  fields: [
    defineField({
      name: 'abbr',
      title: 'Abbreviation',
      type: 'string',
      description: 'e.g., ISO, MOEI, WRAS, ASTM, EN, BS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'standard',
      title: 'Standard Type',
      type: 'string',
      options: {
        list: [
          { title: 'ISO', value: 'iso' },
          { title: 'MOEI (UAE Ministry of Energy)', value: 'moei' },
          { title: 'ASTM International', value: 'astm' },
          { title: 'EN (European Standard)', value: 'en' },
          { title: 'BS (British Standard)', value: 'bs' },
          { title: 'WRAS (UK Water Approval)', value: 'wras' },
        ],
      },
    }),
    defineField({
      name: 'appliesTo',
      title: 'Applies To Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'abbr',
      subtitle: 'name',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} - ${subtitle}`,
      }
    },
  },
})
