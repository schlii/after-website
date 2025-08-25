import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      description: 'Optional heading displayed above tour dates',
    }),
    // Array of 15 images displayed in the photo panels (left-to-right, top-to-bottom)
    defineField({
      name: 'photoImages',
      title: 'Photo Images',
      description:
        'Provide exactly 15 images – one for each photo panel in the Tour grid. Order matters (left-to-right, top-to-bottom).',
      type: 'array',
      validation: Rule => Rule.required().min(15).max(15),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Tour Page' }) },
})
