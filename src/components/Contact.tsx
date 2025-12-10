import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMail, FiMessageCircle, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mailtoLink = `mailto:techarenagroupe@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(`Email: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Contact us today to discuss your project and get started
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-primary-100 mb-8">
                Ready to transform your business with cutting-edge technology? 
                Reach out to us and let's discuss how we can help you achieve your goals.
              </p>
            </div>

            <motion.a
              href="tel:+233549805296"
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all group"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-400 transition-colors">
                <FiPhone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-primary-200 text-sm">Call / WhatsApp</p>
                <p className="text-lg font-semibold">+233 549805296</p>
              </div>
            </motion.a>

            <motion.a
              href="mailto:techarenagroupe@gmail.com"
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all group"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-400 transition-colors">
                <FiMail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-primary-200 text-sm">Email</p>
                <p className="text-lg font-semibold">techarenagroupe@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://wa.me/233549805296"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all group"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-400 transition-colors">
                <FiMessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-primary-200 text-sm">WhatsApp</p>
                <p className="text-lg font-semibold">Chat with us</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: '' })
                  }}
                  className={`w-full px-4 py-3 bg-white/20 backdrop-blur-md border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-white/50'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-300 flex items-center space-x-1"
                  >
                    <FiAlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  className={`w-full px-4 py-3 bg-white/20 backdrop-blur-md border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-white/50'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-300 flex items-center space-x-1"
                  >
                    <FiAlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: '' })
                  }}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/20 backdrop-blur-md border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 resize-none transition-colors ${
                    errors.message ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-white/50'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-300 flex items-center space-x-1"
                  >
                    <FiAlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </motion.p>
                )}
              </div>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-500/20 border border-green-400 rounded-lg flex items-center space-x-2 text-green-200"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/20 border border-red-400 rounded-lg flex items-center space-x-2 text-red-200"
                  >
                    <FiAlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

