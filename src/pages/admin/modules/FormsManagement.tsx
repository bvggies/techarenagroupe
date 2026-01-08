import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiLayers, FiFileText, FiSave } from 'react-icons/fi'
import { useForms } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const FormsManagement = () => {
  const { forms, loading, error, createForm, updateForm, deleteForm, fetchForms } = useForms()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    fields: '[]',
    settings: '{}',
    isActive: true,
  })
  const { showToast } = useToast()

  const filteredForms = forms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        slug: item.slug || '',
        fields: item.fields ? JSON.stringify(item.fields, null, 2) : '[]',
        settings: item.settings ? JSON.stringify(item.settings, null, 2) : '{}',
        isActive: item.isActive ?? true,
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        slug: '',
        fields: '[]',
        settings: '{}',
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
      slug: '',
      fields: '[]',
      settings: '{}',
      isActive: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let fields, settings
      try {
        fields = JSON.parse(formData.fields)
      } catch {
        fields = []
      }
      try {
        settings = JSON.parse(formData.settings)
      } catch {
        settings = {}
      }

      const submitData: any = {
        name: formData.name,
        slug: formData.slug,
        fields,
        settings,
        isActive: formData.isActive,
      }

      if (editingItem) {
        await updateForm(editingItem.id, submitData)
        showToast('Form updated successfully', 'success')
      } else {
        await createForm(submitData)
        showToast('Form created successfully', 'success')
      }
      handleCloseModal()
      fetchForms()
    } catch (err: any) {
      showToast(err.message || 'Failed to save form', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
        await deleteForm(id)
        showToast('Form deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete form', 'error')
      }
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await updateForm(id, { isActive: !currentStatus })
      showToast('Form updated', 'success')
    } catch (err) {
      showToast('Failed to update form', 'error')
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Form Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and manage dynamic forms</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Form</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
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
          {filteredForms.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiLayers className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No forms found</p>
            </div>
          ) : (
            filteredForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{form.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          form.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {form.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Slug: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{form.slug}</code>
                    </p>
                    {form.fields && Array.isArray(form.fields) && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <FiFileText size={16} />
                        <span>{form.fields.length} field(s)</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(form.id, form.isActive)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        form.isActive
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {form.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleOpenModal(form)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
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
        title={editingItem ? 'Edit Form' : 'Create New Form'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter form name"
            required
          />

          <FormField
            label="Slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={(value) => setFormData({ ...formData, slug: value })}
            placeholder="form-slug"
            required
          />

          <FormField
            label="Fields (JSON)"
            name="fields"
            type="textarea"
            value={formData.fields}
            onChange={(value) => setFormData({ ...formData, fields: value })}
            placeholder='[{"type": "text", "label": "Name", "required": true}]'
            rows={6}
            required
          />

          <FormField
            label="Settings (JSON)"
            name="settings"
            type="textarea"
            value={formData.settings}
            onChange={(value) => setFormData({ ...formData, settings: value })}
            placeholder='{"emailNotifications": true}'
            rows={4}
          />

          <FormField
            label="Active"
            name="isActive"
            type="checkbox"
            value={formData.isActive}
            onChange={(value) => setFormData({ ...formData, isActive: value })}
            placeholder="Form is active"
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

export default FormsManagement
