//Con el fin de evitar redundancia en authservice y trofeosservice, creamos la api en un servicio individual y lo exportamos.
//De esta manera reducimos redundancia, ya que en lugar de crear la api cada vez por cada servicio, se crea una sola api para todos los servicios

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

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
      return Promise.reject(new Error('Sesión expirada. Por favor inicia sesión.'))
    }
    return Promise.reject(error)
  }
)

export default api; 