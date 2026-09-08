import api from './api'
import { ref } from 'vue';

export const estaAutenticado = ref(!!localStorage.getItem('token'));

export const setToken = (token) => {
  localStorage.setItem('token', token); // Guardamos para futuras recargas
  estaAutenticado.value = true;         // ¡Esto actualiza TODOS los .vue en tiempo real!
};

export const removeToken = () => {
  localStorage.removeItem('token');
  estaAutenticado.value = false;        // ¡Esto actualiza TODOS los .vue en tiempo real!
};

export const authService = {
  register(data) {
    return api.post('/auth/register', data)
  },
  login(data) {
    return api.post('/auth/login', data)
  },
}