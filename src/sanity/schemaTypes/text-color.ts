import { defineField, defineType } from 'sanity'
import React from 'react'

const ColorIcon = () => React.createElement('span', { style: { fontSize: '0.75rem', fontWeight: 600 } }, 'Color')

export default defineType({
  name: 'textColor',
  title: 'Color',
  type: 'object',
  icon: ColorIcon,
  fields: [
    defineField({
      name: 'shade',
      title: 'Shade',
      type: 'string',
      options: {
        list: [
          { title: 'Red', value: '#e11d48' },
          { title: 'Orange', value: '#fb923c' },
          { title: 'Yellow', value: '#facc15' },
          { title: 'Green', value: '#16a34a' },
          { title: 'Cyan', value: '#06b6d4' },
          { title: 'Blue', value: '#2563eb' },
          { title: 'Purple', value: '#8b5cf6' },
          { title: 'Pink', value: '#ec4899' },
          { title: 'Black', value: '#000000' },
          { title: 'White', value: '#ffffff' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { shade: 'shade' },
    prepare({ shade }) {
      return { title: shade }
    },
  },
})
