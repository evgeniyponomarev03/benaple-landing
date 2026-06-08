import { list } from '@vercel/blob'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function createMediaEntries() {
  console.log('🚀 Creating database entries for Blob images...')
  
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
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: 'media/',
      limit: 1000
    })
    
    console.log(`📁 Found ${blobs.length} files in Vercel Blob storage`)
    
    let created = 0
    let skipped = 0
    
    for (const blob of blobs) {
      const filename = blob.pathname.replace('media/', '')
      
      // Check if this media entry already exists
      const existing = await mediaCollection.findOne({ filename })
      
      if (!existing) {
        // Create new media entry
        const mediaDoc = {
          filename: filename,
          alt: filename.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
          url: blob.url,
          width: null,
          height: null,
          mimeType: getMimeType(filename),
          filesize: blob.size,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        await mediaCollection.insertOne(mediaDoc)
        console.log(`✅ Created entry for: ${filename}`)
        created++
      } else {
        console.log(`⏩ Already exists: ${filename}`)
        skipped++
      }
    }
    
    console.log(`\n🎉 Database entries created!`)
    console.log(`✅ Created: ${created} entries`)
    console.log(`⏩ Skipped: ${skipped} entries (already existed)`)
    console.log(`📊 Total: ${created + skipped} files processed`)
    
    console.log('\n📝 Next steps:')
    console.log('1. Go to your Payload admin panel (http://localhost:3000/admin)')
    console.log('2. Navigate to Media collection')
    console.log('3. You should now see all your images!')
    
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
createMediaEntries()