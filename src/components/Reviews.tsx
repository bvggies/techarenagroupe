import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiUser, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useToast } from '../contexts/ToastContext'
import Ripple from './Ripple'

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  verified?: boolean
}

interface StarRatingProps {
  rating: number
  size?: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

const StarRating = ({ rating, size = 20, interactive = false, onRatingChange }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <FiStar
            size={size}
            className={`${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'John Doe',
      rating: 5,
      comment: 'Excellent service! The team delivered exactly what we needed on time and within budget.',
      date: '2024-01-15',
      verified: true,
    },
    {
      id: '2',
      name: 'Sarah Smith',
      rating: 5,
      comment: 'Professional team with great attention to detail. Highly recommend!',
      date: '2024-01-10',
      verified: true,
    },
    {
      id: '3',
      name: 'Michael Johnson',
      rating: 4,
      comment: 'Good quality work and responsive communication throughout the project.',
      date: '2024-01-05',
      verified: true,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { showToast } = useToast()

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 || 0,
  }))

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating'
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required'
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
    }

    setReviews([newReview, ...reviews])
    setFormData({ name: '', rating: 0, comment: '' })
    setShowForm(false)
    showToast('Thank you for your review!', 'success')
  }

  return (
    <section id="reviews" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Reviews</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what our clients say about working with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} size={24} />
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-8">{rating}</span>
                  <FiStar className="text-yellow-400" size={16} />
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: rating * 0.1 }}
                      className="h-full bg-yellow-400"
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>

            <Ripple color="rgba(14, 165, 233, 0.3)">
              <motion.button
                onClick={() => setShowForm(!showForm)}
                className="w-full mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Write a Review
              </motion.button>
            </Ripple>
          </motion.div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: '' })
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                          <FiAlertCircle size={14} />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Rating</label>
                      <StarRating
                        rating={formData.rating}
                        interactive={true}
                        onRatingChange={(rating) => {
                          setFormData({ ...formData, rating })
                          if (errors.rating) setErrors({ ...errors, rating: '' })
                        }}
                      />
                      {errors.rating && (
                        <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                          <FiAlertCircle size={14} />
                          <span>{errors.rating}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Your Review</label>
                      <textarea
                        value={formData.comment}
                        onChange={(e) => {
                          setFormData({ ...formData, comment: e.target.value })
                          if (errors.comment) setErrors({ ...errors, comment: '' })
                        }}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                          errors.comment
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Share your experience..."
                      />
                      {errors.comment && (
                        <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                          <FiAlertCircle size={14} />
                          <span>{errors.comment}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        type="submit"
                        className="flex-1 px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Review
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShowForm(false)
                          setFormData({ name: '', rating: 0, comment: '' })
                          setErrors({})
                        }}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <FiUser className="text-primary-600 dark:text-primary-400" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <FiCheckCircle className="text-green-500" size={16} title="Verified" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
