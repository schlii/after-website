import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'merch',
  title: 'Merch',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }],
    }),
    defineField({
      name: 'policyLinksText',
      title: 'Policy Links Intro',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'bannerImage' },
    prepare() {
      return { title: 'Merch Page' }
    },
  },
})
