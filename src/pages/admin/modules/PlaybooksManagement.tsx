import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiBook, FiSave } from 'react-icons/fi'
import { usePlaybooks } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const PlaybooksManagement = () => {
  const { playbooks, loading, error, createPlaybook, updatePlaybook, deletePlaybook, fetchPlaybooks } = usePlaybooks()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    tags: '[]',
    isActive: true,
  })
  const { showToast } = useToast()

  const filteredPlaybooks = playbooks.filter((playbook) => {
    const matchesSearch =
      playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (playbook.description && playbook.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || playbook.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(playbooks.map((p) => p.category).filter(Boolean)))

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title || '',
        description: item.description || '',
        content: item.content || '',
        category: item.category || '',
        tags: item.tags ? JSON.stringify(item.tags, null, 2) : '[]',
        isActive: item.isActive ?? true,
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        tags: '[]',
        isActive: true,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      tags: '[]',
      isActive: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let tags
      try {
        tags = JSON.parse(formData.tags)
      } catch {
        tags = []
      }

      const submitData: any = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        tags,
        isActive: formData.isActive,
      }

      if (editingItem) {
        await updatePlaybook(editingItem.id, submitData)
        showToast('Playbook updated successfully', 'success')
      } else {
        await createPlaybook(submitData)
        showToast('Playbook created successfully', 'success')
      }
      handleCloseModal()
      fetchPlaybooks()
    } catch (err: any) {
      showToast(err.message || 'Failed to save playbook', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this playbook?')) {
      try {
        await deletePlaybook(id)
        showToast('Playbook deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete playbook', 'error')
      }
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await updatePlaybook(id, { isActive: !currentStatus })
      showToast('Playbook updated', 'success')
    } catch (err) {
      showToast('Failed to update playbook', 'error')
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Playbooks Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and manage knowledge base playbooks</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Playbook</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search playbooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
          {filteredPlaybooks.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiBook className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No playbooks found</p>
            </div>
          ) : (
            filteredPlaybooks.map((playbook, index) => (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{playbook.title}</h3>
                      {playbook.category && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {playbook.category}
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          playbook.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {playbook.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {playbook.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{playbook.description}</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{playbook.content}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(playbook.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(playbook.id, playbook.isActive)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        playbook.isActive
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {playbook.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleOpenModal(playbook)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(playbook.id)}
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
        title={editingItem ? 'Edit Playbook' : 'Create New Playbook'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="Enter playbook title"
            required
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="Enter playbook description"
            rows={3}
          />

          <FormField
            label="Content"
            name="content"
            type="textarea"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Enter playbook content"
            rows={8}
            required
          />

          <FormField
            label="Category"
            name="category"
            type="text"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Enter category"
          />

          <FormField
            label="Tags (JSON Array)"
            name="tags"
            type="textarea"
            value={formData.tags}
            onChange={(value) => setFormData({ ...formData, tags: value })}
            placeholder='["tag1", "tag2", "tag3"]'
            rows={3}
          />

          <FormField
            label="Active"
            name="isActive"
            type="checkbox"
            value={formData.isActive}
            onChange={(value) => setFormData({ ...formData, isActive: value })}
            placeholder="Playbook is active"
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

export default PlaybooksManagement
