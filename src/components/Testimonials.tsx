import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'John Mensah',
    role: 'CEO, Eventa Ghana',
    content: 'TechArena Groupe transformed our event management system. The team was professional, responsive, and delivered exactly what we needed. Highly recommended!',
    rating: 5,
    image: '👨‍💼',
  },
  {
    id: 2,
    name: 'Sarah Osei',
    role: 'Founder, FitTrack',
    content: 'Working with TechArena was a game-changer. They built our tailor measurement system with precision and attention to detail. Our business has grown significantly since launch.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    id: 3,
    name: 'David Asante',
    role: 'Manager, Lodgex Properties',
    content: 'The CRM system they developed for us has streamlined our operations completely. The team understood our needs and delivered a solution that exceeded our expectations.',
    rating: 5,
    image: '👨‍💻',
  },
  {
    id: 4,
    name: 'Ama Darko',
    role: 'Director, DaSDA Africa',
    content: 'TechArena created a beautiful, functional website for our NGO. They were patient, understanding, and delivered a site that truly represents our mission and values.',
    rating: 5,
    image: '👩‍🎓',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">What Our Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-8 text-center italic leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-4xl">{testimonials[currentIndex].image}</div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6 text-primary-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6 text-primary-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

