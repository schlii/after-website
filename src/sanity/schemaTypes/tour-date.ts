import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tourDate',
  title: 'Tour Dates',
  type: 'document',
  fields: [
    defineField({
      name: 'location',
      title: 'Location (City, Country)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time (UTC)',
      type: 'datetime',
      options: {
        timeStep: 15,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      location: 'location',
      date: 'date',
    },
    prepare({ location, date }) {
      return {
        title: location,
        subtitle: new Date(date).toLocaleDateString(),
      }
    },
  },
})