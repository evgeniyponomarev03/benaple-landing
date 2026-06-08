import { put, list } from '@vercel/blob'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function fixMissingUrls() {
  console.log('🔧 Fixing missing URLs for database entries...')
  
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

    // First check what's already in blob storage
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: 'media/',
      limit: 1000
    })

    const blobMap = {}
    blobs.forEach(blob => {
      const filename = blob.pathname.replace('media/', '')
      blobMap[filename] = blob.url
    })

    let fixed = 0
    let uploaded = 0

    for (const filename of missingImages) {
      try {
        // Check database entry
        const dbEntry = await mediaCollection.findOne({ filename })
        if (!dbEntry) {
          console.log(`❌ No database entry found for: ${filename}`)
          continue
        }

        if (dbEntry.url && dbEntry.url !== 'undefined') {
          console.log(`✅ Already has URL: ${filename}`)
          continue
        }

        // Check if already in blob storage
        if (blobMap[filename]) {
          // Update database with existing blob URL
          await mediaCollection.updateOne(
            { filename },
            { 
              $set: { 
                url: blobMap[filename],
                updatedAt: new Date().toISOString()
              }
            }
          )
          console.log(`🔗 Fixed URL for existing blob: ${filename}`)
          fixed++
        } else {
          // Need to upload to blob storage
          const filePath = path.join(process.cwd(), 'public', 'media', filename)
          
          if (!fs.existsSync(filePath)) {
            console.log(`⚠️ File not found locally: ${filename}`)
            continue
          }

          // Read and upload file
          const fileBuffer = fs.readFileSync(filePath)
          console.log(`📤 Uploading to blob: ${filename}`)
          
          const blob = await put(`media/${filename}`, fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
          })

          // Update database with new blob URL
          await mediaCollection.updateOne(
            { filename },
            { 
              $set: { 
                url: blob.url,
                updatedAt: new Date().toISOString()
              }
            }
          )
          
          console.log(`📤 Uploaded and fixed URL: ${filename}`)
          uploaded++
        }

      } catch (error) {
        console.error(`❌ Failed to fix ${filename}:`, error.message)
      }
    }

    console.log(`\n🎉 URL fixing completed!`)
    console.log(`🔗 Fixed existing: ${fixed} images`)
    console.log(`📤 Uploaded new: ${uploaded} images`)
    
    if (fixed > 0 || uploaded > 0) {
      console.log('\n✅ Missing image URLs have been fixed!')
      console.log('🔄 The images should now load properly.')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

// Run the script
fixMissingUrls()