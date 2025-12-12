import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useToast } from '../contexts/ToastContext'
import Confetti from './Confetti'
import Ripple from './Ripple'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('success')
      setShowConfetti(true)
      showToast('Successfully subscribed to newsletter!', 'success')
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setShowConfetti(false)
      }, 5000)
    } else {
      setStatus('error')
      showToast('Please enter a valid email address', 'error')
      setTimeout(() => setStatus('idle'), 5000)
    }
    setIsSubmitting(false)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-block mb-4">
            <FiMail className="w-12 h-12 text-white mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 dark:text-primary-200 mb-8">
            Subscribe to our newsletter for the latest updates, tech tips, and exclusive offers
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-6 py-4 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Ripple color="rgba(14, 165, 233, 0.3)">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </Ripple>
          </form>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-400 rounded-lg flex items-center justify-center space-x-2 text-green-200"
              >
                <FiCheckCircle className="w-5 h-5" />
                <span>Successfully subscribed! Check your email.</span>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-lg flex items-center justify-center space-x-2 text-red-200"
              >
                <FiAlertCircle className="w-5 h-5" />
                <span>Please enter a valid email address.</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter

