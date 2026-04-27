import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  StrikethroughFeature,
  HeadingFeature,
  UploadFeature,
  BlocksFeature,
  OrderedListFeature,
  UnorderedListFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

import { CallToAction } from '../blocks/CallToAction/config'
import { RichTextImage } from '../blocks/RichTextImage/config'
import { Alert } from '../blocks/Alert/config'
import { Embed } from '../blocks/Embed/config'
import { Code } from '../blocks/Code/config'
import { Banner } from '../blocks/Banner/config'
import { MediaBlock } from '../blocks/MediaBlock/config'

export const defaultLexical = lexicalEditor({
  features: [
    BoldFeature(),
    ItalicFeature(),
    ParagraphFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
    LinkFeature({
      enabledCollections: ['blog'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
          {
            name: 'rel',
            type: 'select',
            hasMany: true,
            options: [
              { label: 'No Opener', value: 'noopener' },
              { label: 'No Referrer', value: 'noreferrer' },
              { label: 'No Follow', value: 'nofollow' },
            ],
          },
          {
            name: 'appearance',
            type: 'select',
            defaultValue: 'default',
            options: [
              { label: 'Default', value: 'default' },
              { label: 'Outline', value: 'outline' },
              { label: 'Ghost', value: 'ghost' },
            ],
          },
        ]
      },
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
          ],
        },
      },
    }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlocksFeature({
      blocks: [CallToAction, RichTextImage, Alert, Embed, Code, Banner, MediaBlock],
    }),
  ],
})
