import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
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