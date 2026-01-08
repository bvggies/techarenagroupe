import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiCheck, FiX, FiSearch, FiEye, FiEyeOff } from 'react-icons/fi'
import { useReviews } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const ReviewsManagement = () => {
  const { reviews, loading, error, updateReview, deleteReview } = useReviews()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const { showToast } = useToast()

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && review.isPublished) ||
      (filter === 'unpublished' && !review.isPublished) ||
      (filter === 'verified' && review.isVerified)
    return matchesSearch && matchesFilter
  })

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      await updateReview(id, { isPublished: !currentStatus })
      showToast(`Review ${!currentStatus ? 'published' : 'unpublished'}`, 'success')
    } catch (err) {
      showToast('Failed to update review', 'error')
    }
  }

  const handleToggleVerify = async (id: number, currentStatus: boolean) => {
    try {
      await updateReview(id, { isVerified: !currentStatus })
      showToast(`Review ${!currentStatus ? 'verified' : 'unverified'}`, 'success')
    } catch (err) {
      showToast('Failed to update review', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(id)
        showToast('Review deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete review', 'error')
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Reviews</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiStar className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No reviews found</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h3>
                      {review.isVerified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs font-semibold">
                          Verified
                        </span>
                      )}
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                    {review.email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{review.email}</p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTogglePublish(review.id, review.isPublished)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.isPublished
                          ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                          : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      title={review.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {review.isPublished ? <FiEye /> : <FiEyeOff />}
                    </button>
                    <button
                      onClick={() => handleToggleVerify(review.id, review.isVerified)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.isVerified
                          ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      title={review.isVerified ? 'Unverify' : 'Verify'}
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ReviewsManagement
