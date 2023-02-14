import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Text',
      type: 'text',
    }),
    
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'recognition',
      title: 'Recognition',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'pens',
      title: 'Favourite Pens',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }),


    
  ],
})
