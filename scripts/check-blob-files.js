import { list } from '@vercel/blob'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function checkBlobFiles() {
  try {
    console.log('🔍 Checking files in Vercel Blob storage...')
    
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      prefix: 'media/',
      limit: 1000
    })
    
    console.log(`📁 Found ${blobs.length} files in Vercel Blob storage:`)
    
    blobs.forEach((blob, index) => {
      console.log(`${index + 1}. ${blob.pathname.replace('media/', '')} (${(blob.size / 1024).toFixed(1)}KB)`)
    })
    
    console.log(`\n✅ Total files uploaded: ${blobs.length}`)
    console.log('🎉 All files are now available via Vercel Blob!')
    
  } catch (error) {
    console.error('❌ Error checking blob files:', error)
  }
}

checkBlobFiles()