// Unified API wrapper that uses API endpoints in production, direct DB in development
import * as apiClient from './apiClient'
// Don't import api.ts statically - it contains Node.js modules that break browser builds
// We'll use dynamic imports only in development

// Helper to determine which API to use
async function useAPI<T>(apiCall: () => Promise<T>, clientCall: () => Promise<T>): Promise<T> {
  // Check if we're in production (browser environment)
  const isProduction = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1'

  // NEVER import api.ts in production - it contains Node.js modules
  if (isProduction) {
    // Always use API client in production
    return await clientCall()
  }
  
  // Development only: use direct DB access via dynamic import
  // This will only work on localhost
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      return await apiCall()
    } catch (error) {
      console.warn('Direct DB access failed, falling back to API:', error)
      return await clientCall()
    }
  }
  
  // Fallback to API client
  return await clientCall()
}

// Wrapped APIs that work in both dev and production
export const wrappedAuthAPI = {
  async login(email: string, password: string) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.authAPI.login(email, password)
      },
      () => apiClient.authAPIClient.login(email, password)
    )
  },
}

export const wrappedDashboardAPI = {
  async getStats() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.dashboardAPI.getStats()
      },
      () => apiClient.dashboardAPIClient.getStats()
    )
  },
}

export const wrappedContentAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.contentAPI.getAll()
      },
      () => apiClient.contentAPIClient.getAll()
    )
  },
  async getById(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.contentAPI.getById(id)
      },
      () => apiClient.contentAPIClient.getById(id)
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.contentAPI.create(data)
      },
      () => apiClient.contentAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.contentAPI.update(id, data)
      },
      () => apiClient.contentAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.contentAPI.delete(id)
      },
      () => apiClient.contentAPIClient.delete(id)
    )
  },
}

export const wrappedQuotesAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.quotesAPI.getAll()
      },
      () => apiClient.quotesAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.quotesAPI.update(id, data)
      },
      () => apiClient.quotesAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.quotesAPI.delete(id)
      },
      () => apiClient.quotesAPIClient.delete(id)
    )
  },
}

export const wrappedTicketsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.ticketsAPI.getAll()
      },
      () => apiClient.ticketsAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.ticketsAPI.update(id, data)
      },
      () => apiClient.ticketsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.ticketsAPI.delete(id)
      },
      () => apiClient.ticketsAPIClient.delete(id)
    )
  },
}

export const wrappedReviewsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.reviewsAPI.getAll()
      },
      () => apiClient.reviewsAPIClient.getAll()
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.reviewsAPI.update(id, data)
      },
      () => apiClient.reviewsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.reviewsAPI.delete(id)
      },
      () => apiClient.reviewsAPIClient.delete(id)
    )
  },
}

export const wrappedAnalyticsAPI = {
  async getAll(limit = 100) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.analyticsAPI.getAll(limit)
      },
      () => apiClient.analyticsAPIClient.getAll(limit)
    )
  },
  async getStats() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.analyticsAPI.getStats()
      },
      () => apiClient.analyticsAPIClient.getStats()
    )
  },
}

export const wrappedStatusesAPI = {
  async getAll(type?: string) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.statusesAPI.getAll(type)
      },
      () => apiClient.statusesAPIClient.getAll(type)
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.statusesAPI.create(data)
      },
      () => apiClient.statusesAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.statusesAPI.update(id, data)
      },
      () => apiClient.statusesAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.statusesAPI.delete(id)
      },
      () => apiClient.statusesAPIClient.delete(id)
    )
  },
}

export const wrappedFormsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.formsAPI.getAll()
      },
      () => apiClient.formsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.formsAPI.create(data)
      },
      () => apiClient.formsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.formsAPI.update(id, data)
      },
      () => apiClient.formsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.formsAPI.delete(id)
      },
      () => apiClient.formsAPIClient.delete(id)
    )
  },
}

export const wrappedIndicatorsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.indicatorsAPI.getAll()
      },
      () => apiClient.indicatorsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.indicatorsAPI.create(data)
      },
      () => apiClient.indicatorsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.indicatorsAPI.update(id, data)
      },
      () => apiClient.indicatorsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.indicatorsAPI.delete(id)
      },
      () => apiClient.indicatorsAPIClient.delete(id)
    )
  },
}

export const wrappedPricingAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.pricingAPI.getAll()
      },
      () => apiClient.pricingAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.pricingAPI.create(data)
      },
      () => apiClient.pricingAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.pricingAPI.update(id, data)
      },
      () => apiClient.pricingAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.pricingAPI.delete(id)
      },
      () => apiClient.pricingAPIClient.delete(id)
    )
  },
}

export const wrappedSocialMediaAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.socialMediaAPI.getAll()
      },
      () => apiClient.socialMediaAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.socialMediaAPI.create(data)
      },
      () => apiClient.socialMediaAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.socialMediaAPI.update(id, data)
      },
      () => apiClient.socialMediaAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.socialMediaAPI.delete(id)
      },
      () => apiClient.socialMediaAPIClient.delete(id)
    )
  },
}

export const wrappedNotificationsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.notificationsAPI.getAll()
      },
      () => apiClient.notificationsAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.notificationsAPI.create(data)
      },
      () => apiClient.notificationsAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.notificationsAPI.update(id, data)
      },
      () => apiClient.notificationsAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.notificationsAPI.delete(id)
      },
      () => apiClient.notificationsAPIClient.delete(id)
    )
  },
}

export const wrappedSEOAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.seoAPI.getAll()
      },
      () => apiClient.seoAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.seoAPI.create(data)
      },
      () => apiClient.seoAPIClient.create(data)
    )
  },
  async update(page: string, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.seoAPI.update(page, data)
      },
      () => apiClient.seoAPIClient.update(page, data)
    )
  },
  async delete(page: string) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.seoAPI.delete(page)
      },
      () => apiClient.seoAPIClient.delete(page)
    )
  },
}

export const wrappedPlaybooksAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.playbooksAPI.getAll()
      },
      () => apiClient.playbooksAPIClient.getAll()
    )
  },
  async create(data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.playbooksAPI.create(data)
      },
      () => apiClient.playbooksAPIClient.create(data)
    )
  },
  async update(id: number, data: any) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.playbooksAPI.update(id, data)
      },
      () => apiClient.playbooksAPIClient.update(id, data)
    )
  },
  async delete(id: number) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.playbooksAPI.delete(id)
      },
      () => apiClient.playbooksAPIClient.delete(id)
    )
  },
}

export const wrappedSiteSettingsAPI = {
  async getAll() {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.siteSettingsAPI.getAll()
      },
      () => apiClient.siteSettingsAPIClient.getAll()
    )
  },
  async update(key: string, value: string) {
    return useAPI(
      async () => {
        const api = await import('./api')
        return api.siteSettingsAPI.update(key, { value })
      },
      () => apiClient.siteSettingsAPIClient.update(key, value)
    )
  },
}
