import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 10,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Booking', value: 'booking' },
          { title: 'Press', value: 'press' },
          { title: 'Technical', value: 'technical' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Resolved', value: 'resolved' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'note',
              title: 'Note',
              type: 'text',
              rows: 3,
            },
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{ type: 'user' }],
            },
            {
              name: 'timestamp',
              title: 'Timestamp',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'responseSent',
      title: 'Response Sent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'responseHistory',
      title: 'Response History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'response',
              title: 'Response',
              type: 'text',
              rows: 5,
            },
            {
              name: 'sentBy',
              title: 'Sent By',
              type: 'reference',
              to: [{ type: 'user' }],
            },
            {
              name: 'sentAt',
              title: 'Sent At',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'email',
      description: 'status',
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title || 'No Subject',
        subtitle: `${subtitle} (${description})`,
      }
    },
  },
})