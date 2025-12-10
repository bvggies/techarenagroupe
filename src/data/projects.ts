export interface Project {
  id: string
  name: string
  description: string
  screenshot: string
  category: 'mobile app' | 'web app' | 'management system' | 'website' | 'portal'
  tags: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Eventa - Ghana Events & Parties Explorer App',
    description: 'A comprehensive mobile and web application for discovering and managing events across Ghana. Built with Expo (React Native), React, Node.js, and Neon PostgreSQL.',
    screenshot: '/assets/eventa.PNG',
    category: 'mobile app',
    tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '2',
    name: 'FitTrack - Tailor Measurement System',
    description: 'A production-ready web-based tailoring measurement & order management system built with Create React App, TypeScript, Tailwind CSS, and Neon Postgres.',
    screenshot: '/assets/FitTrack.png',
    category: 'management system',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: '3',
    name: 'Lodgex CRM',
    description: 'A comprehensive Property Management CRM system built with React, Node.js, and PostgreSQL.',
    screenshot: '/assets/lodgexcrm.png',
    category: 'management system',
    tags: ['React', 'Node.js', 'PostgreSQL', 'CRM'],
  },
  {
    id: '4',
    name: 'Xstream - Live Football Streaming Platform',
    description: 'A complete, production-ready live football streaming web application built with React, Node.js, Express, and PostgreSQL.',
    screenshot: '/assets/xstream.png',
    category: 'web app',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: '5',
    name: 'Tijaniyah Pro - Islamic Mobile App',
    description: 'A comprehensive Islamic mobile application built with React Native and Expo, featuring beautiful UI and smooth animations.',
    screenshot: '/assets/tijaniyah.PNG',
    category: 'mobile app',
    tags: ['React Native', 'Expo', 'Mobile'],
  },
  {
    id: '6',
    name: 'DaSDA Africa Website',
    description: 'Official website for DaSDA Africa (Disability and Social Development Advocacy Africa), also known as Positive Impact - a renowned NGO with 18 years of experience.',
    screenshot: '/assets/dasdaafrica.png',
    category: 'website',
    tags: ['React', 'Website', 'NGO'],
  },
  {
    id: '7',
    name: 'Appah Farms Knowledge Hub',
    description: 'A comprehensive web application designed to help poultry farmers connect, share knowledge, and get AI-powered assistance for their farming needs.',
    screenshot: '/assets/aifarming.PNG',
    category: 'web app',
    tags: ['React', 'AI', 'Farming', 'Web App'],
  },
  {
    id: '8',
    name: 'Transport Recommender System - Nkawkaw New Station',
    description: 'A comprehensive web application for managing transport services with AI-powered recommendations using Groq.',
    screenshot: '/assets/recomendasystem.png',
    category: 'web app',
    tags: ['React', 'AI', 'Groq', 'Transport'],
  },
  {
    id: '9',
    name: 'Online Fire Report & Response Management System',
    description: 'A comprehensive web application for reporting fire incidents, managing responses, and tracking emergency situations.',
    screenshot: '/assets/firesystem.png',
    category: 'management system',
    tags: ['React', 'Management', 'Emergency'],
  },
  {
    id: '10',
    name: 'SmartBite – AI Food Recommendation',
    description: 'SmartBite is an AI-powered food recommendation and recipe web application built with Next.js, TypeScript, and OpenAI. Discover meals, plan diets, and cook efficiently with personalized AI-powered recommendations, with special expertise in Ghanaian cuisine.',
    screenshot: '/assets/ai-foodrecommendation.png',
    category: 'web app',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'AI'],
  },
  {
    id: '11',
    name: 'Operations Tracker - Construction Management System',
    description: 'A comprehensive web application for managing construction operations, built with React and Node.js.',
    screenshot: '/assets/operationtracker.png',
    category: 'management system',
    tags: ['React', 'Node.js', 'Construction'],
  },
  {
    id: '12',
    name: 'JobScheduler - Print Job Management System',
    description: 'A comprehensive web application for managing print shop job scheduling, machine allocation, payment tracking, and analytics.',
    screenshot: '/assets/job.png',
    category: 'management system',
    tags: ['React', 'Management', 'Scheduling'],
  },
  {
    id: '13',
    name: 'DiamondFoods Mobile App',
    description: 'Food delivering mobile app, built with React Native.',
    screenshot: '/assets/Diamondfoods.png',
    category: 'mobile app',
    tags: ['React Native', 'Food Delivery', 'Mobile'],
  },
  {
    id: '14',
    name: 'Educational Mobile App',
    description: 'Built with React Native for students - a comprehensive learning platform.',
    screenshot: '/assets/educational.png',
    category: 'mobile app',
    tags: ['React Native', 'Education', 'Mobile'],
  },
  {
    id: '15',
    name: 'Hoteliq - Hotel Booking Mobile App',
    description: 'Hotel Booking mobile app for seamless reservation management.',
    screenshot: '/assets/Hotelbooking.png',
    category: 'mobile app',
    tags: ['React Native', 'Hotel Booking', 'Mobile'],
  },
  {
    id: '16',
    name: 'Marble Educational Center Learning Portal',
    description: 'A comprehensive learning portal for educational institutions.',
    screenshot: '/assets/mec.PNG',
    category: 'portal',
    tags: ['React', 'Education', 'Portal'],
  },
]

