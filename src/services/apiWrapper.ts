// Unified API wrapper that uses API endpoints in production, direct DB in development
import * as apiClient from './apiClient'
import * as api from './api'

// Helper to determine which API to use
async function useAPI<T>(apiCall: () => Promise<T>, clientCall: () => Promise<T>): Promise<T> {
  // Check if we're in production (browser environment)
  const isProduction = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1'

  if (isProduction) {
    try {
      return await clientCall()
    } catch (error) {
      console.warn('API client failed, falling back to direct DB:', error)
      return await apiCall()
    }
  }
  // Development: use direct DB access
  return await apiCall()
}

// Wrapped APIs that work in both dev and production
export const wrappedAuthAPI = {
  async login(email: string, password: string) {
    return useAPI(
      () => api.authAPI.login(email, password),
      () => apiClient.authAPIClient.login(email, password)
    )
  },
}

export const wrappedDashboardAPI = {
  async getStats() {
    return useAPI(
      () => api.dashboardAPI.getStats(),
      () => apiClient.dashboardAPIClient.getStats()
    )
  },
}

export const wrappedContentAPI = {
  async getAll() {
    return useAPI(
      () => api.contentAPI.getAll(),
      () => apiClient.contentAPIClient.getAll()
    )
  },
  async getById(id: number) {
    return useAPI(
      () => api.contentAPI.getById(id),
      () => apiClient.contentAPIClient.getById(id)
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.contentAPI.create(data),
      () => apiClient.contentAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.contentAPI.update(id, data),
      () => apiClient.contentAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.contentAPI.delete(id),
      () => apiClient.contentAPIClient.delete(id)
    )
  },
}

export const wrappedQuotesAPI = {
  async getAll() {
    return useAPI(
      () => api.quotesAPI.getAll(),
      () => apiClient.quotesAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.quotesAPI.update(id, data),
      () => apiClient.quotesAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.quotesAPI.delete(id),
      () => apiClient.quotesAPIClient.delete(id)
    )
  },
}

export const wrappedTicketsAPI = {
  async getAll() {
    return useAPI(
      () => api.ticketsAPI.getAll(),
      () => apiClient.ticketsAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.ticketsAPI.update(id, data),
      () => apiClient.ticketsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.ticketsAPI.delete(id),
      () => apiClient.ticketsAPIClient.delete(id)
    )
  },
}

export const wrappedReviewsAPI = {
  async getAll() {
    return useAPI(
      () => api.reviewsAPI.getAll(),
      () => apiClient.reviewsAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.reviewsAPI.update(id, data),
      () => apiClient.reviewsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.reviewsAPI.delete(id),
      () => apiClient.reviewsAPIClient.delete(id)
    )
  },
}

export const wrappedAnalyticsAPI = {
  async getAll(limit = 100) {
    return useAPI(
      () => api.analyticsAPI.getAll(limit),
      () => apiClient.analyticsAPIClient.getAll(limit)
    )
  },
  async getStats() {
    return useAPI(
      () => api.analyticsAPI.getStats(),
      () => apiClient.analyticsAPIClient.getStats()
    )
  },
}

export const wrappedStatusesAPI = {
  async getAll(type?: string) {
    return useAPI(
      () => api.statusesAPI.getAll(type),
      () => apiClient.statusesAPIClient.getAll(type)
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.statusesAPI.create(data),
      () => apiClient.statusesAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.statusesAPI.update(id, data),
      () => apiClient.statusesAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.statusesAPI.delete(id),
      () => apiClient.statusesAPIClient.delete(id)
    )
  },
}

export const wrappedFormsAPI = {
  async getAll() {
    return useAPI(
      () => api.formsAPI.getAll(),
      () => apiClient.formsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.formsAPI.create(data),
      () => apiClient.formsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.formsAPI.update(id, data),
      () => apiClient.formsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.formsAPI.delete(id),
      () => apiClient.formsAPIClient.delete(id)
    )
  },
}

export const wrappedIndicatorsAPI = {
  async getAll() {
    return useAPI(
      () => api.indicatorsAPI.getAll(),
      () => apiClient.indicatorsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.indicatorsAPI.create(data),
      () => apiClient.indicatorsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.indicatorsAPI.update(id, data),
      () => apiClient.indicatorsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.indicatorsAPI.delete(id),
      () => apiClient.indicatorsAPIClient.delete(id)
    )
  },
}

export const wrappedPricingAPI = {
  async getAll() {
    return useAPI(
      () => api.pricingAPI.getAll(),
      () => apiClient.pricingAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.pricingAPI.create(data),
      () => apiClient.pricingAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.pricingAPI.update(id, data),
      () => apiClient.pricingAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.pricingAPI.delete(id),
      () => apiClient.pricingAPIClient.delete(id)
    )
  },
}

export const wrappedSocialMediaAPI = {
  async getAll() {
    return useAPI(
      () => api.socialMediaAPI.getAll(),
      () => apiClient.socialMediaAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.socialMediaAPI.create(data),
      () => apiClient.socialMediaAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.socialMediaAPI.update(id, data),
      () => apiClient.socialMediaAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.socialMediaAPI.delete(id),
      () => apiClient.socialMediaAPIClient.delete(id)
    )
  },
}

export const wrappedNotificationsAPI = {
  async getAll() {
    return useAPI(
      () => api.notificationsAPI.getAll(),
      () => apiClient.notificationsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.notificationsAPI.create(data),
      () => apiClient.notificationsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.notificationsAPI.update(id, data),
      () => apiClient.notificationsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.notificationsAPI.delete(id),
      () => apiClient.notificationsAPIClient.delete(id)
    )
  },
}

export const wrappedSEOAPI = {
  async getAll() {
    return useAPI(
      () => api.seoAPI.getAll(),
      () => apiClient.seoAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.seoAPI.create(data),
      () => apiClient.seoAPIClient.create(data)
    )
  },
  async update(page: string, data: any) {
    return useAPI(
      () => api.seoAPI.update(page, data),
      () => apiClient.seoAPIClient.update(page, data)
    )
  },
  async delete(page: string) {
    return useAPI(
      () => api.seoAPI.delete(page),
      () => apiClient.seoAPIClient.delete(page)
    )
  },
}

export const wrappedPlaybooksAPI = {
  async getAll() {
    return useAPI(
      () => api.playbooksAPI.getAll(),
      () => apiClient.playbooksAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      () => api.playbooksAPI.create(data),
      () => apiClient.playbooksAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      () => api.playbooksAPI.update(id, data),
      () => apiClient.playbooksAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      () => api.playbooksAPI.delete(id),
      () => apiClient.playbooksAPIClient.delete(id)
    )
  },
}

export const wrappedSiteSettingsAPI = {
  async getAll() {
    return useAPI(
      () => api.siteSettingsAPI.getAll(),
      () => apiClient.siteSettingsAPIClient.getAll()
    )
  },
  async update(key: string, value: string) {
    return useAPI(
      () => api.siteSettingsAPI.update(key, { value }),
      () => apiClient.siteSettingsAPIClient.update(key, value)
    )
  },
}
