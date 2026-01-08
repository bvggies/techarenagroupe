import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiSettings, FiSave } from 'react-icons/fi'
import { useStatuses } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const StatusManagement = () => {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'project',
    color: '#3B82F6',
    order: '0',
    isActive: true,
  })
  const { statuses, loading, error, createStatus, updateStatus, deleteStatus, fetchStatuses } = useStatuses(
    typeFilter !== 'all' ? typeFilter : undefined
  )
  const { showToast } = useToast()

  const filteredStatuses = statuses.filter(
    (status) =>
      status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        type: item.type || 'project',
        color: item.color || '#3B82F6',
        order: item.order?.toString() || '0',
        isActive: item.isActive ?? true,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        type: 'project',
        color: '#3B82F6',
        order: '0',
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
      color: '#3B82F6',
      order: '0',
      isActive: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        name: formData.name,
        type: formData.type,
        color: formData.color,
        order: parseInt(formData.order) || 0,
        isActive: formData.isActive,
      }

      if (editingItem) {
        await updateStatus(editingItem.id, submitData)
        showToast('Status updated successfully', 'success')
      } else {
        await createStatus(submitData)
        showToast('Status created successfully', 'success')
      }
      handleCloseModal()
      fetchStatuses()
    } catch (err: any) {
      showToast(err.message || 'Failed to save status', 'error')
    }
  }

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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Status Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage status types and configurations</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search statuses..."
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
          <option value="ticket">Ticket</option>
          <option value="quote">Quote</option>
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
          {filteredStatuses.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiSettings className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No statuses found</p>
            </div>
          ) : (
            filteredStatuses.map((status, index) => (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                      onClick={() => handleOpenModal(status)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(status.id)}
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
        title={editingItem ? 'Edit Status' : 'Create New Status'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter status name"
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
              { value: 'ticket', label: 'Ticket' },
              { value: 'quote', label: 'Quote' },
            ]}
            required
          />

          <FormField
            label="Color"
            name="color"
            type="text"
            value={formData.color}
            onChange={(value) => setFormData({ ...formData, color: value })}
            placeholder="#3B82F6"
            required
          />

          <FormField
            label="Order"
            name="order"
            type="number"
            value={formData.order}
            onChange={(value) => setFormData({ ...formData, order: value })}
            placeholder="0"
          />

          <FormField
            label="Active"
            name="isActive"
            type="checkbox"
            value={formData.isActive}
            onChange={(value) => setFormData({ ...formData, isActive: value })}
            placeholder="Status is active"
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

export default StatusManagement
