import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'appleMusicSettings',
  title: 'Apple Music Settings',
  type: 'document',
  __experimental_actions: [
    // Disable delete and duplicate for singleton
    'create',
    'update',
    'publish'
  ],
  fields: [
    defineField({
      name: 'appleArtistId',
      title: 'Apple Music Artist ID',
      type: 'number',
      description: 'Find your artist page on Apple Music and copy the numeric ID from the URL (e.g., https://music.apple.com/us/artist/artist-name/123456789)',
      validation: Rule => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'appleStorefront',
      title: 'Apple Storefront Country',
      type: 'string',
      description: "Two-letter country code for the Apple Music storefront (e.g., 'US', 'GB', 'CA')",
      initialValue: 'US',
      validation: Rule => Rule.required().regex(/^[A-Z]{2}$/),
    }),
    defineField({
      name: 'enabled',
      title: 'Enable Apple Music Integration',
      type: 'boolean',
      description: 'Toggle to enable/disable the music player on your website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'appleArtistId',
      enabled: 'enabled',
    },
    prepare({ title, enabled }) {
      return {
        title: `Apple Music Settings`,
        subtitle: enabled ? `Artist ID: ${title}` : 'Disabled',
      }
    },
  },
})
