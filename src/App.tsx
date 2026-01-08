import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import TechParticles from './components/TechParticles'
import BinaryRain from './components/BinaryRain'
import TechStackVisualization from './components/TechStackVisualization'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import { useAuth } from './contexts/AuthContext'

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
const Reviews = lazy(() => import('./components/Reviews'))
const ProgressIndicators = lazy(() => import('./components/ProgressIndicators'))
const LiveStatusIndicators = lazy(() => import('./components/LiveStatusIndicators'))
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

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function MainApp() {
  useEffect(() => {
    // Smooth scroll behavior - only on non-mobile for better performance
    if (window.innerWidth > 768) {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
    
    // Logo preload removed - not critical for initial render

    // Preconnect to improve resource loading
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.googleapis.com'
    document.head.appendChild(preconnect)

    // Optimize images - add loading="lazy" to all images
    const images = document.querySelectorAll('img:not([loading])')
    images.forEach((img) => {
      if (!(img as HTMLImageElement).hasAttribute('loading')) {
        ;(img as HTMLImageElement).loading = 'lazy'
      }
    })
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
        <Reviews />
        <ProgressIndicators />
        <LiveStatusIndicators />
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
