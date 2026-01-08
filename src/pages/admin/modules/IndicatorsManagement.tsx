import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiTrendingUp, FiSave } from 'react-icons/fi'
import { useIndicators } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const IndicatorsManagement = () => {
  const { indicators, loading, error, createIndicator, updateIndicator, deleteIndicator, fetchIndicators } = useIndicators()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'project',
    value: '0',
    maxValue: '100',
    color: '#0ea5e9',
    isActive: true,
  })
  const { showToast } = useToast()

  const filteredIndicators = indicators.filter((indicator) => {
    const matchesSearch =
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || indicator.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        type: item.type || 'project',
        value: item.value?.toString() || '0',
        maxValue: item.maxValue?.toString() || '100',
        color: item.color || '#0ea5e9',
        isActive: item.isActive ?? true,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        type: 'project',
        value: '0',
        maxValue: '100',
        color: '#0ea5e9',
        isActive: true,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      name: '',
      type: 'project',
      value: '0',
      maxValue: '100',
      color: '#0ea5e9',
      isActive: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        name: formData.name,
        type: formData.type,
        value: parseInt(formData.value) || 0,
        maxValue: parseInt(formData.maxValue) || 100,
        color: formData.color,
        isActive: formData.isActive,
      }

      if (editingItem) {
        await updateIndicator(editingItem.id, submitData)
        showToast('Indicator updated successfully', 'success')
      } else {
        await createIndicator(submitData)
        showToast('Indicator created successfully', 'success')
      }
      handleCloseModal()
      fetchIndicators()
    } catch (err: any) {
      showToast(err.message || 'Failed to save indicator', 'error')
    }
  }

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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Indicators Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage progress indicators and metrics</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Indicator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search indicators..."
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
          <option value="project">Project</option>
          <option value="skill">Skill</option>
          <option value="achievement">Achievement</option>
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
          {filteredIndicators.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiTrendingUp className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No indicators found</p>
            </div>
          ) : (
            filteredIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{indicator.name}</h3>
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
                        className="h-full rounded-full"
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
                      onClick={() => handleOpenModal(indicator)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(indicator.id)}
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
        title={editingItem ? 'Edit Indicator' : 'Create New Indicator'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter indicator name"
            required
          />

          <FormField
            label="Type"
            name="type"
            type="select"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            options={[
              { value: 'project', label: 'Project' },
              { value: 'skill', label: 'Skill' },
              { value: 'achievement', label: 'Achievement' },
            ]}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Value"
              name="value"
              type="number"
              value={formData.value}
              onChange={(value) => setFormData({ ...formData, value: value })}
              placeholder="0"
              required
            />

            <FormField
              label="Max Value"
              name="maxValue"
              type="number"
              value={formData.maxValue}
              onChange={(value) => setFormData({ ...formData, maxValue: value })}
              placeholder="100"
              required
            />
          </div>

          <FormField
            label="Color"
            name="color"
            type="text"
            value={formData.color}
            onChange={(value) => setFormData({ ...formData, color: value })}
            placeholder="#0ea5e9"
            required
          />

          <FormField
            label="Active"
            name="isActive"
            type="checkbox"
            value={formData.isActive}
            onChange={(value) => setFormData({ ...formData, isActive: value })}
            placeholder="Indicator is active"
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

export default IndicatorsManagement
