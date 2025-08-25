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
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      fieldset: 'general',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      fieldset: 'general',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fieldset: 'social',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'spotify', title: 'Spotify', type: 'url' },
        { name: 'appleMusic', title: 'Apple Music', type: 'url' },
        { name: 'bandcamp', title: 'Bandcamp', type: 'url' },
        { name: 'soundcloud', title: 'SoundCloud', type: 'url' },
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: Rule => Rule.required().max(160),
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
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      fieldset: 'general',
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
      title: 'siteTitle',
      subtitle: 'tagline',
    },
  },
})