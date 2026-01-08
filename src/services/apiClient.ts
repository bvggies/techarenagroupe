// Client-side API service that calls Vercel serverless functions
// This is used in production instead of direct database access

const API_BASE = '/api/admin'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }

  return response.json()
}

// Auth API Client
export const authAPIClient = {
  async login(email: string, password: string) {
    return fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
}

// Dashboard API Client
export const dashboardAPIClient = {
  async getStats() {
    return fetchAPI('/dashboard')
  },
}

// Content API Client
export const contentAPIClient = {
  async getAll() {
    return fetchAPI('/content')
  },
  async getById(id: number) {
    return fetchAPI(`/content?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/content?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/content?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Quotes API Client
export const quotesAPIClient = {
  async getAll() {
    return fetchAPI('/quotes')
  },
  async getById(id: number) {
    return fetchAPI(`/quotes?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/quotes?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/quotes?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Tickets API Client
export const ticketsAPIClient = {
  async getAll() {
    return fetchAPI('/tickets')
  },
  async getById(id: number) {
    return fetchAPI(`/tickets?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/tickets?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/tickets?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Reviews API Client
export const reviewsAPIClient = {
  async getAll() {
    return fetchAPI('/reviews')
  },
  async getById(id: number) {
    return fetchAPI(`/reviews?id=${id}`)
  },
  async getPublished() {
    return fetchAPI('/reviews?published=true')
  },
  async create(data: any) {
    return fetchAPI('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/reviews?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/reviews?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Analytics API Client
export const analyticsAPIClient = {
  async getAll(limit = 100) {
    return fetchAPI(`/analytics?limit=${limit}`)
  },
  async getStats() {
    return fetchAPI('/analytics?stats=true')
  },
  async create(data: any) {
    return fetchAPI('/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

// Statuses API Client
export const statusesAPIClient = {
  async getAll(type?: string) {
    return fetchAPI(type ? `/statuses?type=${type}` : '/statuses')
  },
  async getById(id: number) {
    return fetchAPI(`/statuses?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/statuses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/statuses?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/statuses?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Forms API Client
export const formsAPIClient = {
  async getAll() {
    return fetchAPI('/forms')
  },
  async getById(id: number) {
    return fetchAPI(`/forms?id=${id}`)
  },
  async getSubmissions(formId: number) {
    return fetchAPI(`/forms?id=${formId}&submissions=true`)
  },
  async create(data: any) {
    return fetchAPI('/forms', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/forms?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/forms?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Indicators API Client
export const indicatorsAPIClient = {
  async getAll() {
    return fetchAPI('/indicators')
  },
  async getById(id: number) {
    return fetchAPI(`/indicators?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/indicators', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/indicators?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/indicators?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Pricing API Client
export const pricingAPIClient = {
  async getAll() {
    return fetchAPI('/pricing')
  },
  async getById(id: number) {
    return fetchAPI(`/pricing?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/pricing', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/pricing?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/pricing?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Social Media API Client
export const socialMediaAPIClient = {
  async getAll() {
    return fetchAPI('/social-media')
  },
  async getById(id: number) {
    return fetchAPI(`/social-media?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/social-media', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/social-media?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/social-media?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Notifications API Client
export const notificationsAPIClient = {
  async getAll() {
    return fetchAPI('/notifications')
  },
  async getById(id: number) {
    return fetchAPI(`/notifications?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/notifications?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/notifications?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// SEO API Client
export const seoAPIClient = {
  async getAll() {
    return fetchAPI('/seo')
  },
  async getByPage(page: string) {
    return fetchAPI(`/seo?page=${page}`)
  },
  async create(data: any) {
    return fetchAPI('/seo', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(page: string, data: any) {
    return fetchAPI(`/seo?page=${page}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(page: string) {
    return fetchAPI(`/seo?page=${page}`, {
      method: 'DELETE',
    })
  },
}

// Playbooks API Client
export const playbooksAPIClient = {
  async getAll() {
    return fetchAPI('/playbooks')
  },
  async getById(id: number) {
    return fetchAPI(`/playbooks?id=${id}`)
  },
  async create(data: any) {
    return fetchAPI('/playbooks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(id: number, data: any) {
    return fetchAPI(`/playbooks?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  async delete(id: number) {
    return fetchAPI(`/playbooks?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Site Settings API Client
export const siteSettingsAPIClient = {
  async getAll() {
    return fetchAPI('/site-settings')
  },
  async getByKey(key: string) {
    return fetchAPI(`/site-settings?key=${key}`)
  },
  async create(data: any) {
    return fetchAPI('/site-settings', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  async update(key: string, value: string) {
    return fetchAPI(`/site-settings?key=${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    })
  },
  async delete(key: string) {
    return fetchAPI(`/site-settings?key=${key}`, {
      method: 'DELETE',
    })
  },
}
