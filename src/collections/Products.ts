import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'price', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'book',
      options: [
        { label: 'Book', value: 'book' },
        { label: 'Mentorship Session', value: 'session' },
        { label: 'Digital Product', value: 'digital' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Determines checkout behavior. Sessions go directly to Stripe; Books/Digital go through cart.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
                name: 'currency',
                type: 'select',
                defaultValue: 'GBP',
                options: [
                    { label: 'GBP (£)', value: 'GBP' },
                    { label: 'USD ($)', value: 'USD' },
                    { label: 'NGN (₦)', value: 'NGN' },
                ],
                required: true,
                admin: {
                    position: 'sidebar',
                },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'shortDescription',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: true,
            },
            {
              name: 'gains',
              type: 'array',
              label: 'What You Will Gain',
              fields: [
                {
                  name: 'gain',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'whoFor',
              type: 'textarea',
              label: 'Who This Is For',
              required: true,
            },

            {
              name: 'buttonText',
              type: 'text',
              label: 'Button Text',
              required: true,
            },
            {
              name: 'calendlyLink',
              type: 'text',
              label: 'Calendly Link',
              admin: {
                description: 'Optional. Override the global Calendly link for this specific product.',
              },
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Duration',
              defaultValue: 'Tailored',
            },
            {
              name: 'location',
              type: 'select',
              label: 'Location',
              defaultValue: 'Online',
              options: [
                    { label: 'Online', value: 'Online' },
                    { label: 'In-Person', value: 'In-Person' },
                    { label: 'Online / In-Person', value: 'Online / In-Person' },
                ],  
                required: true,
            },
            {
              name: 'booking',
              type: 'text',
              label: 'Booking',
              defaultValue: 'Flexible',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
}
