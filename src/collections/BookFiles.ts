import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const BookFiles: CollectionConfig = {
  slug: 'book-files',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../private/books'),
    disableLocalStorage: false,
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req && args.req.file) {
          const file = args.req.file
          const dotIndex = file.name.lastIndexOf('.')
          const name = dotIndex === -1 ? file.name : file.name.substring(0, dotIndex)
          const ext = dotIndex === -1 ? '' : file.name.substring(dotIndex)

          const sanitizedName = name
            .toLowerCase()
            .replace(/[’'’`“”"]/g, '') // remove curly and straight quotes/apostrophes
            .replace(/[^a-z0-9_-]/gi, '_') // replace any other special character/space with underscore
            .replace(/__+/g, '_') // remove multiple underscores
            .replace(/^_+|_+$/g, '') // trim leading/trailing underscores

          file.name = `${sanitizedName}${ext.toLowerCase()}`
        }
        return args
      },
    ],
    beforeChange: [
      async ({ data, req }) => {
        const file = req.file
        if (file) {
          const supabaseUrl = process.env.SUPABASE_URL
          const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

          if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase configuration missing in environment variables.')
          }

          const uploadUrl = `${supabaseUrl}/storage/v1/object/books/${encodeURIComponent(file.name)}`
          
          console.log(`[Supabase Upload] Uploading ${file.name} to Supabase storage...`)
          
          const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${supabaseServiceKey}`,
              apikey: supabaseServiceKey,
              'Content-Type': file.mimetype,
              'x-upsert': 'true',
            },
            body: file.data,
          })

          if (!response.ok) {
            const errorMsg = await response.text()
            throw new Error(`Failed to upload file to Supabase: ${errorMsg}`)
          }

          console.log(`[Supabase Upload] Successfully uploaded ${file.name} to Supabase.`)
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc, req: _req }) => {
        if (doc && doc.filename) {
          const supabaseUrl = process.env.SUPABASE_URL
          const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

          if (supabaseUrl && supabaseServiceKey) {
            const deleteUrl = `${supabaseUrl}/storage/v1/object/books/${encodeURIComponent(doc.filename)}`
            console.log(`[Supabase Delete] Deleting ${doc.filename} from Supabase storage...`)
            
            const response = await fetch(deleteUrl, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${supabaseServiceKey}`,
                apikey: supabaseServiceKey,
              },
            })

            if (!response.ok) {
              const errorMsg = await response.text()
              console.warn(`[Supabase Delete] Warning: failed to delete ${doc.filename} from Supabase: ${errorMsg}`)
            } else {
              console.log(`[Supabase Delete] Successfully deleted ${doc.filename} from Supabase.`)
            }
          }
        }
      },
    ],
  },
  fields: [],
}
export default BookFiles
