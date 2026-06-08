import { list } from '@vercel/blob'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function fixAllMediaUrls() {
  console.log('🔧 Fixing ALL media URLs in database...')
  
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.DATABASE_URI) {
    console.error('❌ Error: Missing required environment variables')
    process.exit(1)
  }

  let client

  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.DATABASE_URI)
    await client.connect()
    const db = client.db()
    const mediaCollection = db.collection('media')
    
    console.log('✅ Connected to database')

    // Get all files from Vercel Blob
    console.log('📋 Fetching all blob storage files...')
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: 'media/',
      limit: 1000
    })

    console.log(`📁 Found ${blobs.length} files in Vercel Blob storage`)

    // Create a map of filename -> blob URL
    const blobMap = {}
    blobs.forEach(blob => {
      const filename = blob.pathname.replace('media/', '')
      blobMap[filename] = blob.url
    })

    // Get all media entries from database
    console.log('📋 Fetching all database media entries...')
    const mediaEntries = await mediaCollection.find({}).toArray()
    console.log(`📄 Found ${mediaEntries.length} media entries in database`)

    let updated = 0
    let skipped = 0
    let notFound = 0

    console.log('\\n🔄 Processing media entries...')
    
    for (const entry of mediaEntries) {
      try {
        const filename = entry.filename
        
        // Check if we have a blob URL for this file
        if (blobMap[filename]) {
          // Check if URL needs updating
          if (entry.url !== blobMap[filename]) {
            await mediaCollection.updateOne(
              { _id: entry._id },
              { 
                $set: { 
                  url: blobMap[filename],
                  updatedAt: new Date().toISOString()
                }
              }
            )
            console.log(`✅ Updated: ${filename}`)
            updated++
          } else {
            console.log(`⏩ Already correct: ${filename}`)
            skipped++
          }
        } else {
          console.log(`⚠️ No blob found for: ${filename}`)
          notFound++
        }

      } catch (error) {
        console.error(`❌ Failed to update ${entry.filename}:`, error.message)
      }
    }

    console.log(`\\n🎉 URL fixing completed!`)
    console.log(`✅ Updated: ${updated} entries`)
    console.log(`⏩ Already correct: ${skipped} entries`) 
    console.log(`⚠️ Not found in blob: ${notFound} entries`)
    console.log(`📊 Total processed: ${updated + skipped + notFound} entries`)
    
    if (updated > 0) {
      console.log('\\n🔄 Database has been updated with proper blob URLs!')
      console.log('🌐 Images should now use direct blob storage URLs instead of API endpoints.')
      console.log('📝 You may need to redeploy your application for changes to take effect in production.')
    }

    // Show some sample URLs
    console.log('\\n📋 Sample updated URLs:')
    const samples = await mediaCollection.find({ url: { $ne: null, $ne: undefined } }).limit(3).toArray()
    samples.forEach(item => {
      console.log(`   ${item.filename}: ${item.url}`)
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

// Run the script
fixAllMediaUrls()