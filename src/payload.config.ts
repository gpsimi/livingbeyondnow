import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { resendAdapter } from '@payloadcms/email-resend'
import { cloudinaryAdapter } from './utilities/cloudinaryAdapter'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'
import { Testimonials } from './collections/Testimonials/index'
import { Products } from './collections/Products'

import { Users } from './collections/Users'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

console.log('ENV CHECK:', {
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'MISSING',
})
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    suppressHydrationWarning: true,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/Logo/Logo',
        Icon: '/components/Logo/Icon',
      },
    },
    meta: {
      titleSuffix: '- Prime Counsel Limited',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Blog, Media, Categories, Users, Testimonials, Products],
  email: resendAdapter({
    defaultFromAddress: 'info@primecounsel.co.uk',
    defaultFromName: 'Prime Counsel Limited',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            cloud_name:
              process.env.CLOUDINARY_CLOUD_NAME ||
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
              '',
            api_key: process.env.CLOUDINARY_API_KEY || '',
            api_secret: process.env.CLOUDINARY_API_SECRET || '',
          }),
          generateFileURL: ({ filename, prefix }) => {
            if (!filename) return ''
            const folder = prefix || ''
            const publicId = folder ? `${folder}/${filename}` : filename
            const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
            return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
          },
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
