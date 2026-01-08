import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiSearch, FiGlobe, FiSettings } from 'react-icons/fi'
import { useSiteSettings } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const SiteSettingsManagement = () => {
  const { settings, loading, error, updateSetting } = useSiteSettings()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const { showToast } = useToast()

  const categories = Array.from(new Set(settings.map((s) => s.category).filter(Boolean)))

  const filteredSettings = settings.filter((setting) => {
    const matchesSearch =
      setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (setting.value && setting.value.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || setting.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key)
    setEditValue(setting.value || '')
  }

  const handleSave = async (key: string) => {
    try {
      await updateSetting(key, editValue)
      setEditingKey(null)
      showToast('Setting updated successfully', 'success')
    } catch (err) {
      showToast('Failed to update setting', 'error')
    }
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditValue('')
  }

  const getValueInput = (setting: any) => {
    if (setting.type === 'boolean') {
      return (
        <select
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      )
    }
    if (setting.type === 'number') {
      return (
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )
    }
    return (
      <textarea
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
      />
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search settings..."
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
          {filteredSettings.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiSettings className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No settings found</p>
            </div>
          ) : (
            filteredSettings.map((setting) => (
              <motion.div
                key={setting.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {setting.key}
                      </h3>
                      {setting.category && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {setting.category}
                        </span>
                      )}
                      {setting.type && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                          {setting.type}
                        </span>
                      )}
                    </div>
                    {editingKey === setting.key ? (
                      <div className="space-y-3">
                        {getValueInput(setting)}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSave(setting.key)}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            <FiSave size={16} />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <span className="font-semibold">Value:</span>{' '}
                          {setting.value || <span className="text-gray-400 italic">(empty)</span>}
                        </p>
                        <button
                          onClick={() => handleEdit(setting)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    )}
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

export default SiteSettingsManagement
