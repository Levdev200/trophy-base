import api from './api'

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const trofeosService = {
  getAll() {
    return api.get('/trofeos')
  },
  getOne(id) {
    return api.get(`/trofeos/${id}`)
  },
  create(data) {
    return api.post('/trofeos', data)
  },
  update(id, data) {
    return api.patch(`/trofeos/${id}`, data)
  },
  remove(id) {
    return api.delete(`/trofeos/${id}`)
  },
}