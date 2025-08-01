import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bandMember',
  title: 'Band Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
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
      name: 'instruments',
      title: 'Instruments',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'joinDate',
      title: 'Join Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'website', title: 'Personal Website', type: 'url' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Member',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this member on the homepage or in prominent sections',
    }),
    defineField({
      name: 'pastBands',
      title: 'Past Bands/Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'bandName', title: 'Band Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'years', title: 'Years Active', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
})