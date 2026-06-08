import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function finalUrlFix() {
  console.log('🔧 Final URL fix: Ensuring all media entries work with Vercel blob storage...')
  
  if (!process.env.DATABASE_URI) {
    console.error('❌ Error: Missing DATABASE_URI')
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

    // Get all media entries that have blob URLs
    const mediaWithBlobUrls = await mediaCollection.find({ 
      url: { $regex: /^https:\/\/.*\.public\.blob\.vercel-storage\.com/ } 
    }).toArray()

    console.log(`📄 Found ${mediaWithBlobUrls.length} entries with blob URLs`)

    let updated = 0

    for (const entry of mediaWithBlobUrls) {
      // Ensure the entry has the correct structure for Vercel blob storage
      const updateData = {
        updatedAt: new Date().toISOString(),
        // Ensure prefix is set correctly
        prefix: 'media',
      }

      await mediaCollection.updateOne(
        { _id: entry._id },
        { $set: updateData }
      )
      
      updated++
    }

    console.log(`\n🎉 Updated ${updated} entries with correct structure`)
    
    // Show current status
    console.log('\n📊 Current status:')
    
    const withBlobUrls = await mediaCollection.countDocuments({ 
      url: { $regex: /^https:\/\/.*\.public\.blob\.vercel-storage\.com/ } 
    })
    
    const withApiUrls = await mediaCollection.countDocuments({ 
      url: { $regex: /^\/api\/media/ } 
    })
    
    const withoutUrls = await mediaCollection.countDocuments({ 
      $or: [
        { url: { $exists: false } },
        { url: null },
        { url: undefined }
      ]
    })

    console.log(`✅ Entries with blob URLs: ${withBlobUrls}`)
    console.log(`⚠️ Entries with API URLs: ${withApiUrls}`)
    console.log(`❌ Entries without URLs: ${withoutUrls}`)

    if (withBlobUrls > 0) {
      console.log('\\n🌟 SUCCESS: Database is ready for Vercel blob storage!')
      console.log('\\n📝 Next steps:')
      console.log('1. Deploy to Vercel production')
      console.log('2. The images should now use direct blob URLs in production')
      console.log('3. In development, you may still see /api/media/file/ URLs (this is normal)')
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
finalUrlFix()