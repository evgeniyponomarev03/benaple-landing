import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function resetAdminPassword() {
  console.log('🔑 Resetting admin password...')
  
  if (!process.env.DATABASE_URI) {
    console.error('❌ Error: Missing DATABASE_URI')
    process.exit(1)
  }

  const newPassword = 'admin123' // Change this to your desired password
  const email = 'ki@continuous.vc'

  let client

  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.DATABASE_URI)
    await client.connect()
    const db = client.db()
    const usersCollection = db.collection('users')
    
    console.log('✅ Connected to database')

    // Find the user
    const user = await usersCollection.findOne({ email })
    if (!user) {
      console.error(`❌ User ${email} not found`)
      process.exit(1)
    }

    // Hash the new password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update the password
    await usersCollection.updateOne(
      { email },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date().toISOString()
        }
      }
    )

    console.log(`✅ Password reset successfully for ${email}`)
    console.log(`🔑 New password: ${newPassword}`)
    console.log('')
    console.log('📝 Next steps:')
    console.log('1. Go to: https://beneple-website.vercel.app/admin/login')
    console.log(`2. Email: ${email}`)
    console.log(`3. Password: ${newPassword}`)
    console.log('4. Change the password after logging in!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

// Run the script
resetAdminPassword()