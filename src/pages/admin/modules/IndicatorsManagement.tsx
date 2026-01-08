import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiTrendingUp } from 'react-icons/fi'
import { useIndicators } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const IndicatorsManagement = () => {
  const { indicators, loading, error, createIndicator, updateIndicator, deleteIndicator } = useIndicators()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const { showToast } = useToast()

  const filteredIndicators = indicators.filter((indicator) => {
    const matchesSearch =
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || indicator.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this indicator?')) {
      try {
        await deleteIndicator(id)
        showToast('Indicator deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete indicator', 'error')
      }
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await updateIndicator(id, { isActive: !currentStatus })
      showToast('Indicator updated', 'success')
    } catch (err) {
      showToast('Failed to update indicator', 'error')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Indicators Management</h2>
        <button
          onClick={() => {
            showToast('Create indicator feature coming soon', 'info')
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus />
          <span>New Indicator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search indicators..."
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
          <option value="skill">Skill</option>
          <option value="achievement">Achievement</option>
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
          {filteredIndicators.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiTrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No indicators found</p>
            </div>
          ) : (
            filteredIndicators.map((indicator) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {indicator.name}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      {indicator.type}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {indicator.value} / {indicator.maxValue || 100}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((indicator.value / (indicator.maxValue || 100)) * 100).toFixed(0)}%`,
                        }}
                        className={`h-full ${
                          indicator.color
                            ? ''
                            : 'bg-primary-500'
                        } rounded-full`}
                        style={{ backgroundColor: indicator.color || '#0ea5e9' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleToggleActive(indicator.id, indicator.isActive)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      indicator.isActive
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {indicator.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        showToast('Edit indicator feature coming soon', 'info')
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(indicator.id)}
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

export default IndicatorsManagement
