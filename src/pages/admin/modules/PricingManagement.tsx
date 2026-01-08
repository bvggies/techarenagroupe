import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDollarSign, FiPlus, FiEdit, FiTrash2, FiStar, FiSave } from 'react-icons/fi'
import { usePricingPlans } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'
import Modal from '../../../components/admin/Modal'
import FormField from '../../../components/admin/FormField'

const PricingManagement = () => {
  const { plans, loading, error, createPlan, updatePlan, deletePlan, fetchPlans } = usePricingPlans()
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    features: '[]',
    isPopular: false,
    isActive: true,
    order: '0',
  })
  const { showToast } = useToast()

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price?.toString() || '',
        currency: item.currency || 'USD',
        features: item.features ? JSON.stringify(item.features, null, 2) : '[]',
        isPopular: item.isPopular || false,
        isActive: item.isActive ?? true,
        order: item.order?.toString() || '0',
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        currency: 'USD',
        features: '[]',
        isPopular: false,
        isActive: true,
        order: '0',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      features: '[]',
      isPopular: false,
      isActive: true,
      order: '0',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let features
      try {
        features = JSON.parse(formData.features)
      } catch {
        features = []
      }

      const submitData: any = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        currency: formData.currency,
        features,
        isPopular: formData.isPopular,
        isActive: formData.isActive,
        order: parseInt(formData.order) || 0,
      }

      if (editingItem) {
        await updatePlan(editingItem.id, submitData)
        showToast('Pricing plan updated successfully', 'success')
      } else {
        await createPlan(submitData)
        showToast('Pricing plan created successfully', 'success')
      }
      handleCloseModal()
      fetchPlans()
    } catch (err: any) {
      showToast(err.message || 'Failed to save pricing plan', 'error')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      try {
        await deletePlan(id)
        showToast('Pricing plan deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete pricing plan', 'error')
      }
    }
  }

  const handleTogglePopular = async (id: number, currentStatus: boolean) => {
    try {
      await updatePlan(id, { isPopular: !currentStatus })
      showToast('Pricing plan updated', 'success')
    } catch (err) {
      showToast('Failed to update pricing plan', 'error')
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pricing Plans</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your pricing plans and packages</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-500/30 font-medium"
        >
          <FiPlus size={20} />
          <span>New Plan</span>
        </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <FiDollarSign className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No pricing plans found</p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 relative hover:shadow-lg transition-shadow ${
                  plan.isPopular
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-semibold flex items-center space-x-1">
                    <FiStar size={12} />
                    <span>Popular</span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                  )}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{plan.currency}</span>
                  </div>
                </div>

                {plan.features && Array.isArray(plan.features) && (
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleTogglePopular(plan.id, plan.isPopular)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      plan.isPopular
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {plan.isPopular ? 'Popular' : 'Make Popular'}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(plan)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
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
        title={editingItem ? 'Edit Pricing Plan' : 'Create New Pricing Plan'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="e.g., Basic Plan"
            required
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="Enter plan description"
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              placeholder="0"
              required
            />

            <FormField
              label="Currency"
              name="currency"
              type="text"
              value={formData.currency}
              onChange={(value) => setFormData({ ...formData, currency: value })}
              placeholder="USD"
              required
            />
          </div>

          <FormField
            label="Features (JSON Array)"
            name="features"
            type="textarea"
            value={formData.features}
            onChange={(value) => setFormData({ ...formData, features: value })}
            placeholder='["Feature 1", "Feature 2", "Feature 3"]'
            rows={6}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Order"
              name="order"
              type="number"
              value={formData.order}
              onChange={(value) => setFormData({ ...formData, order: value })}
              placeholder="0"
            />

            <div className="space-y-2">
              <FormField
                label="Popular"
                name="isPopular"
                type="checkbox"
                value={formData.isPopular}
                onChange={(value) => setFormData({ ...formData, isPopular: value })}
                placeholder="Mark as popular plan"
              />

              <FormField
                label="Active"
                name="isActive"
                type="checkbox"
                value={formData.isActive}
                onChange={(value) => setFormData({ ...formData, isActive: value })}
                placeholder="Plan is active"
              />
            </div>
          </div>

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

export default PricingManagement
