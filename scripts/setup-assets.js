import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy assets folder to public if it exists in root
const assetsSource = path.join(__dirname, '..', 'assets')
const assetsDest = path.join(__dirname, '..', 'public', 'assets')

if (fs.existsSync(assetsSource) && !fs.existsSync(assetsDest)) {
  console.log('Copying assets to public folder...')
  
  // Create public/assets directory
  fs.mkdirSync(assetsDest, { recursive: true })
  
  // Copy all files from assets to public/assets
  const files = fs.readdirSync(assetsSource)
  files.forEach(file => {
    const sourcePath = path.join(assetsSource, file)
    const destPath = path.join(assetsDest, file)
    fs.copyFileSync(sourcePath, destPath)
    console.log(`Copied ${file}`)
  })
  
  console.log('Assets copied successfully!')
} else if (fs.existsSync(assetsDest)) {
  console.log('Assets already exist in public folder.')
} else {
  console.log('Assets folder not found in root. Please ensure assets folder exists.')
}

