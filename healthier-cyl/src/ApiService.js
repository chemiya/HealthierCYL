// apiService.js
import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/reclamaciones-ambito-sanitario/', // Reemplaza con la base URL de tu API
});

export const getDatos = async () => {
  try {
    const response = await ApiService.get('records?limit=20');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Agrega más funciones según las necesidades de tu aplicación
// Por ejemplo, funciones para post, put, delete, etc.

export default ApiService;
