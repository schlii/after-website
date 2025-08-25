import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'formIntro',
      title: 'Form Introduction',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'pressEmail',
      title: 'Press Email',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
