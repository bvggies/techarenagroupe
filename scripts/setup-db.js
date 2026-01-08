const { execSync } = require('child_process')
require('dotenv').config()

console.log('🚀 Setting up database...\n')

try {
  console.log('📦 Running database migrations...')
  execSync('pnpm run db:migrate', { stdio: 'inherit', shell: true })
  
  console.log('\n🌱 Seeding database...')
  execSync('pnpm run db:seed', { stdio: 'inherit', shell: true })
  
  console.log('\n✅ Database setup completed successfully!')
  console.log('\n📝 Default admin credentials:')
  console.log('   Email: admin@techarena.com')
  console.log('   Password: admin123')
} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  process.exit(1)
}
