import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'album',
      title: 'Album',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'itunesPreviewUrl',
      title: 'iTunes Preview URL',
      type: 'url',
      description: 'Apple iTunes 30-second preview clip URL (m4a)',
      validation: Rule => Rule.required().uri({ allowRelative: false, scheme: ['http','https'] }),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify Track URL',
      type: 'url',
      description: 'Optional. Used for "Listen on Spotify" button',
      validation: Rule => Rule.uri({ allowRelative: false, scheme: ['http','https'] }),
    }),
    defineField({
      name: 'albumArt',
      title: 'Album Artwork',
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
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    // Removed fileSize/bitRate/format as audio hosting is not used
    defineField({
      name: 'copyright',
      title: 'Copyright Information',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
      rows: 20,
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'bpm',
      title: 'BPM',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'keySignature',
      title: 'Key Signature',
      type: 'string',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
    }),
    defineField({
      name: 'isExplicit',
      title: 'Explicit Content',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isrc',
      title: 'ISRC',
      type: 'string',
      description: 'International Standard Recording Code',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist',
      media: 'albumArt',
    },
  },
})