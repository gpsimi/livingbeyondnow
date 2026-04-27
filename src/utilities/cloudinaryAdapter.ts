import { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import path from 'path'

interface CloudinaryConfig {
  cloud_name: string
  api_key: string
  api_secret: string
}

const getCloudinaryInstance = async (config: CloudinaryConfig) => {
  const { v2: cloudinary } = await import('cloudinary')
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
    secure: true,
  })
  return cloudinary
}

export const cloudinaryAdapter = (config: CloudinaryConfig): Adapter => {
  return ({ prefix }): GeneratedAdapter => {
    return {
      name: 'cloudinary',

      handleUpload: async ({ file, data }) => {
        const cloudinary = await getCloudinaryInstance(config)

        if (!file.buffer || file.buffer.length === 0) {
          throw new Error('[Cloudinary] file.buffer is empty or undefined')
        }

        const folder = data?.section ? `${prefix ? `${prefix}/` : ''}${data.section}` : prefix
        const publicId = path.parse(file.filename).name

        // Use data URI upload instead of streams — streams don't work in the RSC webpack context
        const dataURI = `data:${file.mimeType};base64,${file.buffer.toString('base64')}`

        const result = await cloudinary.uploader.upload(dataURI, {
          public_id: publicId,
          folder: folder || undefined,
          overwrite: true,
          resource_type: 'auto',
        })

        console.log('[Cloudinary] Upload success:', result.secure_url)
      },

      handleDelete: async ({ doc, filename }) => {
        const cloudinary = await getCloudinaryInstance(config)

        const docWithPrefix = doc as { prefix?: string }
        const folder = docWithPrefix?.prefix || prefix
        const publicId = path.parse(filename).name
        const fullPublicId = folder ? `${folder}/${publicId}` : publicId

        try {
          await cloudinary.uploader.destroy(fullPublicId)
          console.log('[Cloudinary] Deleted:', fullPublicId)
        } catch (err) {
          console.error('[Cloudinary] Delete error:', err)
        }
      },

      generateURL: ({ filename, prefix: urlPrefix }) => {
        const folder = urlPrefix || prefix
        const fullPublicId = folder ? `${folder}/${filename}` : filename
        return `https://res.cloudinary.com/${config.cloud_name}/image/upload/${fullPublicId}`
      },

      staticHandler: (req, { doc }) => {
        const docRecord = doc as Record<string, unknown>
        const urlPrefix = docRecord?.prefix || prefix
        const filename = docRecord?.filename
        
        if (!filename || typeof filename !== 'string') {
          return new Response('Not found', { status: 404 })
        }

        const fullPublicId = urlPrefix ? `${urlPrefix}/${filename}` : filename
        const cloudUrl = `https://res.cloudinary.com/${config.cloud_name}/image/upload/${fullPublicId}`
        
        return Response.redirect(cloudUrl, 302)
      },
    }
  }
}
