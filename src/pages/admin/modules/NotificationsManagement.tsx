import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiBell, FiSend, FiSave } from 'react-icons/fi'
import { useNotifications } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const NotificationsManagement = () => {
  const { notifications, loading, error, createNotification, updateNotification, deleteNotification, fetchNotifications } = useNotifications()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    targetAudience: 'all',
    scheduledAt: '',
    status: 'draft',
  })
  const { showToast } = useToast()

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title || '',
        message: item.message || '',
        type: item.type || 'info',
        targetAudience: item.targetAudience || 'all',
        scheduledAt: item.scheduledAt ? new Date(item.scheduledAt).toISOString().slice(0, 16) : '',
        status: item.status || 'draft',
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        message: '',
        type: 'info',
        targetAudience: 'all',
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
      title: '',
      message: '',
      type: 'info',
      targetAudience: 'all',
      scheduledAt: '',
      status: 'draft',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData: any = {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        targetAudience: formData.targetAudience,
        status: formData.status,
      }

      if (formData.scheduledAt) {
        submitData.scheduledAt = new Date(formData.scheduledAt).toISOString()
      }

      if (editingItem) {
        await updateNotification(editingItem.id, submitData)
        showToast('Notification updated successfully', 'success')
      } else {
        await createNotification(submitData)
        showToast('Notification created successfully', 'success')
      }
      handleCloseModal()
      fetchNotifications()
    } catch (err: any) {
      showToast(err.message || 'Failed to save notification', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteNotification(id)
        showToast('Notification deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete notification', 'error')
      }
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateNotification(id, { status: newStatus })
      showToast('Notification status updated', 'success')
    } catch (err) {
      showToast('Failed to update notification', 'error')
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Push Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage push notifications and alerts</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Notification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
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
          <option value="sent">Sent</option>
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
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiBell className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                      {notification.type && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{notification.message}</p>
                    {notification.targetAudience && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Target: {notification.targetAudience}
                      </p>
                    )}
                    {notification.scheduledAt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Scheduled: {new Date(notification.scheduledAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <select
                      value={notification.status}
                      onChange={(e) => handleStatusChange(notification.id, e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="sent">Sent</option>
                    </select>
                    <button
                      onClick={() => handleOpenModal(notification)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
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
        title={editingItem ? 'Edit Notification' : 'Create New Notification'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="Enter notification title"
            required
          />

          <FormField
            label="Message"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={(value) => setFormData({ ...formData, message: value })}
            placeholder="Enter notification message"
            rows={6}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Type"
              name="type"
              type="select"
              value={formData.type}
              onChange={(value) => setFormData({ ...formData, type: value })}
              options={[
                { value: 'info', label: 'Info' },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error', label: 'Error' },
              ]}
              required
            />

            <FormField
              label="Target Audience"
              name="targetAudience"
              type="select"
              value={formData.targetAudience}
              onChange={(value) => setFormData({ ...formData, targetAudience: value })}
              options={[
                { value: 'all', label: 'All Users' },
                { value: 'specific', label: 'Specific' },
              ]}
              required
            />
          </div>

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
              { value: 'sent', label: 'Sent' },
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

export default NotificationsManagement
