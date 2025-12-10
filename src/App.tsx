import { useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import TechParticles from './components/TechParticles'
import BinaryRain from './components/BinaryRain'
import TechStackVisualization from './components/TechStackVisualization'

// Lazy load components below the fold for better initial load
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const TechTicker = lazy(() => import('./components/TechTicker'))
const Features = lazy(() => import('./components/Features'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const Projects = lazy(() => import('./components/Projects'))
const Pricing = lazy(() => import('./components/Pricing'))
const Partners = lazy(() => import('./components/Partners'))
const ProcessTimeline = lazy(() => import('./components/ProcessTimeline'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQ = lazy(() => import('./components/FAQ'))
const Newsletter = lazy(() => import('./components/Newsletter'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CookieConsent = lazy(() => import('./components/CookieConsent'))

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  useEffect(() => {
    // Smooth scroll behavior - only on non-mobile for better performance
    if (window.innerWidth > 768) {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
    
    // Preload critical resources
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = '/assets/logo.png'
    document.head.appendChild(link)
  }, [])

  return (
    <div className="min-h-screen relative">
      <TechParticles />
      <BinaryRain />
      <ScrollProgress />
      <Header />
      <Hero />
      <Suspense fallback={<LoadingPlaceholder />}>
        <About />
        <Services />
        <TechTicker />
        <TechStackVisualization />
        <Features />
        <WhyChooseUs />
        <Projects />
        <Pricing />
        <Partners />
        <ProcessTimeline />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <Contact />
        <Footer />
      </Suspense>
      <ScrollToTop />
      <CookieConsent />
    </div>
  )
}

export default App

