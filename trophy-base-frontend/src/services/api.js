//Con el fin de evitar redundancia en authservice y trofeosservice, creamos la api en un servicio individual y lo exportamos.
//De esta manera reducimos redundancia, ya que en lugar de crear la api cada vez por cada servicio, se crea una sola api para todos los servicios

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});


export default api; 