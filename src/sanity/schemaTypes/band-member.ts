import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bandInfo',
  title: 'Band Info',
  type: 'document',
  fields: [
    defineField({
      name: 'bandImage1',
      title: 'Band Image 1',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bandImage2',
      title: 'Band Image 2',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio1',
      title: 'Bio 1',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bio2',
      title: 'Bio 2',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Band Info' }
    },
  },
})