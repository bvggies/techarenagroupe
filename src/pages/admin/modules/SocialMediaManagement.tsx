import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiShare2, FiCalendar, FiSave } from 'react-icons/fi'
import { useSocialMedia } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const SocialMediaManagement = () => {
  const { posts, loading, error, createPost, updatePost, deletePost, fetchPosts } = useSocialMedia()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    platform: 'facebook',
    content: '',
    mediaUrl: '',
    scheduledAt: '',
    status: 'draft',
  })
  const { showToast } = useToast()

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.platform.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        platform: item.platform || 'facebook',
        content: item.content || '',
        mediaUrl: item.mediaUrl || '',
        scheduledAt: item.scheduledAt ? new Date(item.scheduledAt).toISOString().slice(0, 16) : '',
        status: item.status || 'draft',
      })
    } else {
      setEditingItem(null)
      setFormData({
        platform: 'facebook',
        content: '',
        mediaUrl: '',
        scheduledAt: '',
        status: 'draft',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      platform: 'facebook',
      content: '',
      mediaUrl: '',
      scheduledAt: '',
      status: 'draft',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        platform: formData.platform,
        content: formData.content,
        status: formData.status,
      }

      if (formData.mediaUrl) {
        submitData.mediaUrl = formData.mediaUrl
      }

      if (formData.scheduledAt) {
        submitData.scheduledAt = new Date(formData.scheduledAt).toISOString()
      }

      if (editingItem) {
        await updatePost(editingItem.id, submitData)
        showToast('Post updated successfully', 'success')
      } else {
        await createPost(submitData)
        showToast('Post created successfully', 'success')
      }
      handleCloseModal()
      fetchPosts()
    } catch (err: any) {
      showToast(err.message || 'Failed to save post', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id)
        showToast('Post deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete post', 'error')
      }
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updatePost(id, { status: newStatus })
      showToast('Post status updated', 'success')
    } catch (err) {
      showToast('Failed to update post', 'error')
    }
  }

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      facebook: 'bg-blue-500',
      twitter: 'bg-sky-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-600',
    }
    return colors[platform.toLowerCase()] || 'bg-gray-500'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Social Media Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your social media posts and content</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
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
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiShare2 className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`${getPlatformColor(post.platform)} text-white px-3 py-1 rounded-lg text-sm font-semibold capitalize`}
                      >
                        {post.platform}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">{post.content}</p>
                    {post.mediaUrl && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{post.mediaUrl}</p>
                    )}
                    {post.scheduledAt && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar size={14} />
                        <span>Scheduled: {new Date(post.scheduledAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.id, e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                    </select>
                    <button
                      onClick={() => handleOpenModal(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
        title={editingItem ? 'Edit Post' : 'Create New Post'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Platform"
            name="platform"
            type="select"
            value={formData.platform}
            onChange={(value) => setFormData({ ...formData, platform: value })}
            options={[
              { value: 'facebook', label: 'Facebook' },
              { value: 'twitter', label: 'Twitter' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'linkedin', label: 'LinkedIn' },
            ]}
            required
          />

          <FormField
            label="Content"
            name="content"
            type="textarea"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Enter post content"
            rows={6}
            required
          />

          <FormField
            label="Media URL"
            name="mediaUrl"
            type="text"
            value={formData.mediaUrl}
            onChange={(value) => setFormData({ ...formData, mediaUrl: value })}
            placeholder="https://example.com/image.jpg"
          />

          <FormField
            label="Scheduled At"
            name="scheduledAt"
            type="date"
            value={formData.scheduledAt}
            onChange={(value) => setFormData({ ...formData, scheduledAt: value })}
            placeholder=""
          />

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'published', label: 'Published' },
            ]}
            required
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

export default SocialMediaManagement
