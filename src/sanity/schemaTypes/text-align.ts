import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textAlign',
  title: 'Align',
  type: 'object',
  icon: () => '≡',
  fields: [
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { align: 'align' },
    prepare({ align }) {
      return { title: align }
    },
  },
})
