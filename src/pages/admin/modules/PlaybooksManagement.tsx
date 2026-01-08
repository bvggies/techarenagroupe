import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiBook } from 'react-icons/fi'
import { usePlaybooks } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const PlaybooksManagement = () => {
  const { playbooks, loading, error, createPlaybook, updatePlaybook, deletePlaybook } = usePlaybooks()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const { showToast } = useToast()

  const filteredPlaybooks = playbooks.filter((playbook) => {
    const matchesSearch =
      playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (playbook.description && playbook.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || playbook.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(playbooks.map((p) => p.category).filter(Boolean)))

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Playbooks Management</h2>
        <button
          onClick={() => {
            showToast('Create playbook feature coming soon', 'info')
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus />
          <span>New Playbook</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search playbooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
          {filteredPlaybooks.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiBook className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No playbooks found</p>
            </div>
          ) : (
            filteredPlaybooks.map((playbook) => (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {playbook.title}
                      </h3>
                      {playbook.category && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {playbook.category}
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          playbook.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {playbook.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {playbook.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {playbook.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {playbook.content}
                    </p>
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
                      onClick={() => {
                        showToast('Edit playbook feature coming soon', 'info')
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(playbook.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
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

export default PlaybooksManagement
