import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tourDate',
  title: 'Tour Date',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
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
      name: 'timezone',
      title: 'Venue Timezone',
      type: 'string',
      description: 'Example: America/New_York, Europe/London',
    }),
    defineField({
      name: 'coordinates',
      title: 'Venue Location',
      type: 'geopoint',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'venueCapacity',
      title: 'Venue Capacity',
      type: 'number',
    }),
    defineField({
      name: 'specialNotes',
      title: 'Special Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})