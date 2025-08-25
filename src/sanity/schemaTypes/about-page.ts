import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }],
    }),
    defineField({
      name: 'text1',
      title: 'Text Block 1',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }],
    }),
    defineField({
      name: 'text2',
      title: 'Text Block 2',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Page' }
    },
  },
})
