import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Alert: Block = {
  slug: 'alert',
  interfaceName: 'AlertBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    {
      name: 'message',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
  ],
}
