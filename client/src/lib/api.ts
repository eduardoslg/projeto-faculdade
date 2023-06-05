import axios from 'axios'

import { toast } from '@siakit/toast'

const VITE_APP_REST_URL = 'http://localhost:3333'

const api = axios.create({
  baseURL: VITE_APP_REST_URL,
})

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem(`@faculdade:token`)

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(error)
    if (error.response.status === 401) {
      localStorage.removeItem(`@faculdade:token`)
      localStorage.removeItem(`@faculdade:user`)

      window.location.href = '/sign-in'
    }

    if (!error.response.config.url.includes('session/oauth')) {
      toast({
        type: 'error',
        title: '',
        description: error.response.data.error,
      })
    }

    return Promise.reject(error.response)
  },
)

export { api }
