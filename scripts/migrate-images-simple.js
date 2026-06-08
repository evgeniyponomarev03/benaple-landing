import { put } from '@vercel/blob'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrateImages() {
  console.log('🚀 Starting image migration to Vercel Blob...')
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN not found in environment variables')
    process.exit(1)
  }
  
  try {
    // Get all media files from public/media directory
    const mediaDir = path.join(__dirname, '../public/media')
    const files = await fs.readdir(mediaDir)
    
    console.log(`📁 Found ${files.length} files to migrate`)
    
    const results = []
    
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
          
          results.push({
            filename,
            url,
            size: stats.size,
            success: true
          })
          
          console.log(`✅ Successfully uploaded ${filename} to ${url}`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message)
        results.push({
          filename,
          success: false,
          error: error.message
        })
      }
    }
    
    console.log('\n🎉 Migration completed!')
    console.log(`✅ Successfully uploaded: ${results.filter(r => r.success).length} files`)
    console.log(`❌ Failed uploads: ${results.filter(r => !r.success).length} files`)
    
    if (results.filter(r => r.success).length > 0) {
      console.log('\n📝 Next steps:')
      console.log('1. Go to your Payload admin panel (http://localhost:3000/admin)')
      console.log('2. Navigate to Media collection')
      console.log('3. Upload your images again through the admin panel to create database entries')
      console.log('4. Or manually create media entries in the database')
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run the migration
migrateImages()