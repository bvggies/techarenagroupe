import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDollarSign, FiPlus, FiEdit, FiTrash2, FiStar } from 'react-icons/fi'
import { usePricingPlans } from '../../../hooks/useAdminData'
import { useToast } from '../../../contexts/ToastContext'

const PricingManagement = () => {
  const { plans, loading, error, createPlan, updatePlan, deletePlan } = usePricingPlans()
  const { showToast } = useToast()

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pricing Plans</h2>
        <button
          onClick={() => {
            // TODO: Open create modal
            showToast('Create pricing plan feature coming soon', 'info')
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiPlus />
          <span>New Plan</span>
        </button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <FiDollarSign className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">No pricing plans found</p>
            </div>
          ) : (
            plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-2 ${
                  plan.isPopular
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-gray-200 dark:border-gray-700'
                } relative`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold flex items-center space-x-1">
                    <FiStar size={12} />
                    <span>Popular</span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>
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
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
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
                      onClick={() => {
                        // TODO: Open edit modal
                        showToast('Edit pricing plan feature coming soon', 'info')
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
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

export default PricingManagement
