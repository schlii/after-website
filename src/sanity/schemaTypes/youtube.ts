import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required().regex(
        /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        'Must be a valid YouTube URL'
      ),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({ url }) {
      return {
        title: 'YouTube Video',
        subtitle: url,
      }
    },
  },
})