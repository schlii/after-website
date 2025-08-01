import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
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
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
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
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'pressEmail',
      title: 'Press Email',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
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
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'tagline',
    },
  },
})