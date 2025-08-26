import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'global',
  title: 'Global Settings',
  type: 'document',
  fieldsets: [
    {
      name: 'general',
      title: 'General Settings',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'social',
      title: 'Social Media Links',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'seo',
      title: 'SEO & Analytics',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      fieldset: 'seo',
      description: 'Used for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.optional(),
        },
      ],
      validation: Rule => Rule.optional(),
    }),

    // Background images for homepage slideshow
    defineField({
      name: 'backgroundImages',
      title: 'Background Images (Slideshow)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.optional(),
            },
          ],
        },
      ],
      description:
        'Add two or more images to enable an 8-second cross-fade slideshow. If only one image is provided it will be used as a static background.',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      fieldset: 'seo',
    }),

  ],
  preview: {
    select: {
      title: 'seoDescription',
    },
  },
})