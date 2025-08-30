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
          type: 'string'
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
        {
          name: 'linkUrl',
          title: 'Link URL',
          type: 'url',
          description: 'Optional. When set, clicking the hero image navigates to this URL.',
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
    defineField({
      name: 'heroHoverGif',
      title: 'Hero Hover GIF',
      type: 'image',
      description: 'Transparent animated GIF that fades in when the hero panel is hovered',
      options: { accept: 'image/gif' }
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
