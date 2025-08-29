import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            {
              name: 'fitMode',
              title: 'Fit Mode',
              type: 'string',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                  { title: 'Fill', value: 'fill' },
                  { title: 'Scale Down', value: 'scale-down' },
                  { title: 'None', value: 'none' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
})
