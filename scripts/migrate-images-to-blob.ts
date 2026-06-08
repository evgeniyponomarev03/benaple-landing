import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import fs from 'fs/promises'
import path from 'path'
import { put } from '@vercel/blob'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrateImages() {
  console.log('🚀 Starting image migration to Vercel Blob...')
  
  try {
    // Initialize Payload
    const payload = await getPayload({ config })
    
    // Get all media files from public/media directory
    const mediaDir = path.join(__dirname, '../public/media')
    const files = await fs.readdir(mediaDir)
    
    console.log(`📁 Found ${files.length} files to migrate`)
    
    for (const filename of files) {
      try {
        const filePath = path.join(mediaDir, filename)
        const stats = await fs.stat(filePath)
        
        if (stats.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename)) {
          console.log(`📤 Uploading ${filename}...`)
          
          // Read file
          const fileBuffer = await fs.readFile(filePath)
          
          // Upload to Vercel Blob
          const { url } = await put(`media/${filename}`, fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })
          
          // Check if this media already exists in database
          const existingMedia = await payload.find({
            collection: 'media',
            where: {
              filename: {
                equals: filename,
              },
            },
          })
          
          if (existingMedia.docs.length === 0) {
            // Create new media entry in database
            await payload.create({
              collection: 'media',
              data: {
                filename: filename,
                alt: filename.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
                url: url,
                width: undefined,
                height: undefined,
                mimeType: getMimeType(filename),
                filesize: stats.size,
              },
            })
            
            console.log(`✅ Successfully migrated ${filename} to ${url}`)
          } else {
            console.log(`⏩ ${filename} already exists in database, skipping...`)
          }
        }
      } catch (error: any) {
        console.error(`❌ Error processing ${filename}:`, error.message)
      }
    }
    
    console.log('🎉 Migration completed!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    process.exit(0)
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

// Run the migration
migrateImages()