import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TechTicker from './components/TechTicker'
import Features from './components/Features'
import WhyChooseUs from './components/WhyChooseUs'
import Projects from './components/Projects'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Services />
      <TechTicker />
      <Features />
      <WhyChooseUs />
      <Projects />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App

