import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiStar, FiCheck, FiX, FiSearch, FiEye, FiEyeOff, FiSave, FiEdit, FiTrash2 } from 'react-icons/fi'
import { useReviews } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const ReviewsManagement = () => {
  const { reviews, loading, error, createReview, updateReview, deleteReview, fetchReviews } = useReviews()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    comment: '',
    isVerified: false,
    isPublished: false,
  })
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

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        email: item.email || '',
        rating: item.rating?.toString() || '5',
        comment: item.comment || '',
        isVerified: item.isVerified || false,
        isPublished: item.isPublished || false,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        email: '',
        rating: '5',
        comment: '',
        isVerified: false,
        isPublished: false,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      name: '',
      email: '',
      rating: '5',
      comment: '',
      isVerified: false,
      isPublished: false,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        name: formData.name,
        email: formData.email,
        rating: parseInt(formData.rating),
        comment: formData.comment,
        isVerified: formData.isVerified,
        isPublished: formData.isPublished,
      }

      if (editingItem) {
        await updateReview(editingItem.id, submitData)
        showToast('Review updated successfully', 'success')
      } else {
        await createReview(submitData)
        showToast('Review created successfully', 'success')
      }
      handleCloseModal()
      fetchReviews()
    } catch (err: any) {
      showToast(err.message || 'Failed to save review', 'error')
    }
  }

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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reviews Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage client reviews and testimonials</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
        >
          <option value="all">All Reviews</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiStar className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No reviews found</p>
            </div>
          ) : (
            filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                      {review.isVerified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs font-semibold">
                          Verified
                        </span>
                      )}
                      {review.isPublished && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-semibold">
                          Published
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          size={18}
                        />
                      ))}
                    </div>
                    {review.email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{review.email}</p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{review.comment}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
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
                      {review.isPublished ? <FiEye size={18} /> : <FiEyeOff size={18} />}
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
                      <FiCheck size={18} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(review)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Review' : 'Create New Review'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter reviewer name"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="reviewer@example.com"
          />

          <FormField
            label="Rating"
            name="rating"
            type="select"
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
            options={[
              { value: '1', label: '1 Star' },
              { value: '2', label: '2 Stars' },
              { value: '3', label: '3 Stars' },
              { value: '4', label: '4 Stars' },
              { value: '5', label: '5 Stars' },
            ]}
            required
          />

          <FormField
            label="Comment"
            name="comment"
            type="textarea"
            value={formData.comment}
            onChange={(value) => setFormData({ ...formData, comment: value })}
            placeholder="Enter review comment"
            rows={6}
            required
          />

          <FormField
            label="Verified"
            name="isVerified"
            type="checkbox"
            value={formData.isVerified}
            onChange={(value) => setFormData({ ...formData, isVerified: value })}
            placeholder="Mark as verified review"
          />

          <FormField
            label="Published"
            name="isPublished"
            type="checkbox"
            value={formData.isPublished}
            onChange={(value) => setFormData({ ...formData, isPublished: value })}
            placeholder="Publish this review"
          />

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
            >
              <FiSave size={18} />
              <span>{editingItem ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ReviewsManagement
