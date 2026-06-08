import { put } from '@vercel/blob'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function uploadMissingImages() {
  console.log('🚀 Uploading missing images to Vercel Blob...')
  
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.DATABASE_URI) {
    console.error('❌ Error: Missing required environment variables')
    process.exit(1)
  }

  const missingImages = [
    'background_03.png',
    'bg-arrows.png',
    'uifaces-popular-avatar.jpg',
    'uifaces-popular-avatar (1).jpg'
  ]

  let client

  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.DATABASE_URI)
    await client.connect()
    const db = client.db()
    const mediaCollection = db.collection('media')
    
    console.log('✅ Connected to database')

    let uploaded = 0
    let failed = 0

    for (const filename of missingImages) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'media', filename)
        
        if (!fs.existsSync(filePath)) {
          console.log(`⚠️ File not found: ${filename}`)
          failed++
          continue
        }

        // Check if already exists in database
        const existing = await mediaCollection.findOne({ filename })
        if (existing) {
          console.log(`⏩ Already exists in DB: ${filename}`)
          continue
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath)
        const stats = fs.statSync(filePath)

        // Upload to Vercel Blob
        console.log(`📤 Uploading ${filename}...`)
        const blob = await put(`media/${filename}`, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN
        })

        // Create database entry
        const mediaDoc = {
          filename: filename,
          alt: filename.replace(/\.[^/.]+$/, '').replace(/[()-]/g, ' ').trim(),
          url: blob.url,
          width: null,
          height: null,
          mimeType: getMimeType(filename),
          filesize: stats.size,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await mediaCollection.insertOne(mediaDoc)
        console.log(`✅ Uploaded and created DB entry: ${filename}`)
        uploaded++

      } catch (error) {
        console.error(`❌ Failed to upload ${filename}:`, error.message)
        failed++
      }
    }

    console.log(`\n🎉 Upload completed!`)
    console.log(`✅ Uploaded: ${uploaded} images`)
    console.log(`❌ Failed: ${failed} images`)
    
    if (uploaded > 0) {
      console.log('\n📝 Missing images have been uploaded to Vercel Blob storage!')
      console.log('🔄 Restart your dev server to see the changes.')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

function getMimeType(filename) {
  const ext = filename.split('.').pop()?.toLowerCase()
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

// Run the script
uploadMissingImages()