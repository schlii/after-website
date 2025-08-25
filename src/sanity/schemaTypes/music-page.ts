import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    defineField({
      name: 'playlistHeading',
      title: 'Playlist Heading',
      type: 'string',
      description: 'Optional heading shown above the music player',
    }),
  ],
  preview: { prepare: () => ({ title: 'Music Page' }) },
})
