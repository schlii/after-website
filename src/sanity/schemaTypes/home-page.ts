import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'fitMode',
          title: 'Image Fit Mode',
          type: 'string',
          description: 'How the image should fit within the hero panel',
          options: {
            list: [
              { title: 'Cover (default)', value: 'cover' },
              { title: 'Contain', value: 'contain' },
              { title: 'Fill (stretch)', value: 'fill' },
              { title: 'Scale Down', value: 'scale-down' },
              { title: 'None', value: 'none' }
            ],
            layout: 'dropdown'
          },
          initialValue: 'cover'
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      media: 'heroImage',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
      }
    },
  },
})
