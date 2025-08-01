import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'spotify',
  title: 'Spotify Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Spotify URL',
      type: 'url',
      validation: Rule => Rule.required().regex(
        /^https:\/\/open\.spotify\.com\/(track|album|playlist|artist)\/.+$/,
        'Must be a valid Spotify URL'
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
        title: 'Spotify Embed',
        subtitle: url,
      }
    },
  },
})