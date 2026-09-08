import axios from 'axios'
import router from '../router/index.js'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')

      return Promise.reject(
        new Error('Sesión expirada. Por favor inicia sesión.'),
      )
    }

    return Promise.reject(error)
  },
)

export default api