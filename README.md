# TechArena Groupe - Company Website

A modern, animated website for TechArena Groupe showcasing services, projects, and contact information.

## Features

- ✨ **Modern UI/UX** - Clean, professional design with smooth animations
- 🎨 **Framer Motion Animations** - Expressive animations and transitions throughout
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎯 **3D Card Animations** - Interactive service and project cards
- 🔄 **Sticky Navigation** - Header stays fixed while scrolling
- 🎬 **Slideshow Component** - Featured projects with auto-slide functionality
- 🏷️ **Tech Stack Ticker** - Animated scrolling tech stack display
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid styling

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy assets to public folder (required for images to load):
```bash
npm run setup-assets
```
Or manually copy the `assets` folder to `public/assets`

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to Vercel, GitHub Pages, or any static hosting service.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and deploy

### GitHub Pages

1. Build the project: `npm run build`
2. Follow GitHub Pages deployment guide for Vite projects

## Project Structure

```
techarenagroupe/
├── assets/              # Images and logos
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── TechTicker.tsx
│   │   ├── Features.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── projects.ts  # Project data
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Sections

1. **Hero** - Eye-catching landing section with animated background
2. **Services** - 8 service offerings with 3D card animations
3. **Tech Ticker** - Scrolling tech stack display
4. **Features** - What clients get with our services
5. **Why Choose Us** - Key differentiators
6. **Projects** - Portfolio showcase with slideshow and filtering
7. **Contact** - Contact form and information
8. **Footer** - Additional links and information

## Customization

- Update project data in `src/data/projects.ts`
- Modify colors in `tailwind.config.js`
- Adjust animations in component files
- Replace logo in `assets/logo.png`

## License

© 2024 TechArena Groupe. All rights reserved.

