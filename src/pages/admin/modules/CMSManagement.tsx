import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiDatabase, FiSave } from 'react-icons/fi'
import { useContent } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const CMSManagement = () => {
  const { content, loading, error, createContent, updateContent, deleteContent, fetchContent } = useContent()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    type: 'page',
    status: 'draft',
    metadata: '',
  })
  const { showToast } = useToast()

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title || '',
        slug: item.slug || '',
        content: item.content || '',
        type: item.type || 'page',
        status: item.status || 'draft',
        metadata: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        slug: '',
        content: '',
        type: 'page',
        status: 'draft',
        metadata: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      type: 'page',
      status: 'draft',
      metadata: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        type: formData.type,
        status: formData.status,
      }

      if (formData.metadata) {
        try {
          submitData.metadata = JSON.parse(formData.metadata)
        } catch {
          submitData.metadata = { note: formData.metadata }
        }
      }

      if (editingItem) {
        await updateContent(editingItem.id, submitData)
        showToast('Content updated successfully', 'success')
      } else {
        await createContent(submitData)
        showToast('Content created successfully', 'success')
      }
      handleCloseModal()
      fetchContent()
    } catch (err: any) {
      showToast(err.message || 'Failed to save content', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteContent(id)
        showToast('Content deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete content', 'error')
      }
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateContent(id, { status: newStatus })
      showToast('Content status updated', 'success')
    } catch (err) {
      showToast('Failed to update content', 'error')
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CMS Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all your CMS content</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Content</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
        >
          <option value="all">All Types</option>
          <option value="page">Page</option>
          <option value="post">Post</option>
          <option value="section">Section</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiDatabase className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No content found</p>
            </div>
          ) : (
            filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Slug: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">{item.slug}</code>
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                      {item.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {item.content.substring(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
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
        title={editingItem ? 'Edit Content' : 'Create New Content'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(value) => {
              setFormData({ ...formData, title: value, slug: formData.slug || generateSlug(value) })
            }}
            placeholder="Enter content title"
            required
          />

          <FormField
            label="Slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={(value) => setFormData({ ...formData, slug: value })}
            placeholder="content-slug"
            required
          />

          <FormField
            label="Type"
            name="type"
            type="select"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            options={[
              { value: 'page', label: 'Page' },
              { value: 'post', label: 'Post' },
              { value: 'section', label: 'Section' },
            ]}
            required
          />

          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
              { value: 'archived', label: 'Archived' },
            ]}
            required
          />

          <FormField
            label="Content"
            name="content"
            type="textarea"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Enter content body"
            rows={8}
            required
          />

          <FormField
            label="Metadata (JSON)"
            name="metadata"
            type="textarea"
            value={formData.metadata}
            onChange={(value) => setFormData({ ...formData, metadata: value })}
            placeholder='{"key": "value"}'
            rows={4}
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

export default CMSManagement
