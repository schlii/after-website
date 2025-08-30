import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  fields: [
    defineField({
      name: 'panelHeading',
      title: 'Panel Heading',
      type: 'string',
      description: 'Optional heading displayed above the news rich-text.',
    }),
    defineField({
      name: 'panelContent',
      title: 'News Panel Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'Center', value: 'center' },
            { title: 'Right', value: 'right' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              { type: 'textColor' },
              { type: 'textAlign' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Rich-text (with inline images) shown inside the news panel on the home page.',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'panelHeading' },
    prepare({ title }) {
      return { title: title || 'News Page' }
    },
  },
})
