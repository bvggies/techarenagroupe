import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiSettings } from 'react-icons/fi'
import { useStatuses } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const StatusManagement = () => {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { statuses, loading, error, createStatus, updateStatus, deleteStatus } = useStatuses(
    typeFilter !== 'all' ? typeFilter : undefined
  )
  const { showToast } = useToast()

  const filteredStatuses = statuses.filter(
    (status) =>
      status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this status?')) {
      try {
        await deleteStatus(id)
        showToast('Status deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete status', 'error')
      }
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await updateStatus(id, { isActive: !currentStatus })
      showToast('Status updated', 'success')
    } catch (err) {
      showToast('Failed to update status', 'error')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Status Management</h2>
        <button
          onClick={() => {
            showToast('Create status feature coming soon', 'info')
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus />
          <span>New Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search statuses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="project">Project</option>
          <option value="ticket">Ticket</option>
          <option value="quote">Quote</option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStatuses.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiSettings className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No statuses found</p>
            </div>
          ) : (
            filteredStatuses.map((status) => (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {status.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        {status.type}
                      </span>
                      {status.color && (
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: status.color }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleToggleActive(status.id, status.isActive)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      status.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {status.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        showToast('Edit status feature coming soon', 'info')
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(status.id)}
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

export default StatusManagement
