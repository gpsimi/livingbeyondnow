import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { Readable } from 'stream'
import path from 'path'
import { fileURLToPath } from 'url'

// Load env manually
import { config } from 'dotenv'
config({ path: 'c:/Users/Godspower Similoluwa/Documents/GitHub/prime-counsel-website/.env' })

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const api_key = process.env.CLOUDINARY_API_KEY
const api_secret = process.env.CLOUDINARY_API_SECRET

console.log('=== Cloudinary Diagnostic ===')
console.log('cloud_name:', cloud_name || 'MISSING')
console.log('api_key:', api_key ? api_key.slice(0, 6) + '...' : 'MISSING')
console.log('api_secret:', api_secret ? '***present***' : 'MISSING')

if (!cloud_name || !api_key || !api_secret) {
  console.error('\n❌ Missing credentials - check your .env file')
  process.exit(1)
}

cloudinary.config({ cloud_name, api_key, api_secret, secure: true })

// Test 1: Ping the API
console.log('\n--- Test 1: Ping Cloudinary API ---')
try {
  const result = await cloudinary.api.ping()
  console.log('✅ Ping success:', result)
} catch (err) {
  console.error('❌ Ping failed:', err.message)
  process.exit(1)
}

// Test 2: Upload a tiny 1x1 PNG buffer
console.log('\n--- Test 2: Upload tiny image buffer ---')
// 1x1 transparent PNG
const pngBuffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64'
)

try {
  await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: 'diagnostic-test', folder: 'prime-counsel-test', overwrite: true, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('❌ Upload failed:', JSON.stringify(error, null, 2))
          reject(error)
        } else {
          console.log('✅ Upload success!')
          console.log('   URL:', result.secure_url)
          resolve(result)
        }
      }
    )
    const stream = new Readable()
    stream.push(pngBuffer)
    stream.push(null)
    stream.pipe(uploadStream)
  })
} catch (err) {
  console.error('Upload error details:', err)
}
