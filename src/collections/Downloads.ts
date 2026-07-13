import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'token',
    defaultColumns: ['token', 'product', 'email', 'downloadCount', 'expiresAt'],
  },
  fields: [
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'maxDownloads',
      type: 'number',
      defaultValue: 2,
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
  ],
}
