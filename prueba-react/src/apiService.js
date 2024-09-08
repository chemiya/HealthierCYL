// src/apiService.js
import axios from 'axios';

const API_URL = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/reclamaciones-ambito-sanitario/';



const apiService = {
  getNumeroReclamacionesProvincia: async () => {
    try {
      const response = await axios.get(`${API_URL}/records?select=count(*)&group_by=provincia`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },

  getNumeroReclamacionesProvinciaNivelAsistencial: async () => {
    try {
      const response = await axios.get(`${API_URL}/records?select=count(*)&group_by=provincia%2Cnivel_asistencial`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },

  getNumeroReclamacionesProvinciaMotivoGeneral: async () => {
    try {
      const response = await axios.get(`${API_URL}/records?select=count(*)&group_by=provincia%2Cmotivo_general`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },


  getNumeroReclamacionesProvinciaNivelAsistencialMotivoGeneral: async () => {
    try {
      const response = await axios.get(`${API_URL}/records?select=count(*)&group_by=provincia%2Cnivel_asistencial%2Cmotivo_general`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },


  getNumeroReclamacionesCentros: async () => {
    try {
      const response = await axios.get(`${API_URL}/records?select=sum(total_reclamaciones_con_motivo)%20as%20suma&group_by=centro&order_by=suma%20desc&limit=10`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },

  getNumeroReclamacionesCentrosNivelAsistencial: async (nivelAsistencialOriginal) => {

    nivelAsistencialOriginal = nivelAsistencialOriginal.replace(/ /g, '%20');


    try {
      const response = await axios.get(`${API_URL}/records?select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%27${nivelAsistencialOriginal}%27&group_by=centro&order_by=suma%20desc&limit=10`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },

  getNumeroReclamacionesCentrosMotivoGeneral: async (motivoGeneralOriginal) => {

    motivoGeneralOriginal = motivoGeneralOriginal.replace(/ /g, '%20').replace(/\//g, '%2F');


    try {
      const response = await axios.get(`${API_URL}/records?select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=motivo_general%20like%20%27${motivoGeneralOriginal}%27&group_by=centro&order_by=suma%20desc&limit=10`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  },
  getNumeroReclamacionesCentrosMes: async (mesOriginal) => {


    try {
      const response = await axios.get(`${API_URL}/records?select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=mes_recepcion%20like%20%27${mesOriginal}%27&group_by=centro&order_by=suma%20desc&limit=10`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos 1:', error);
      throw error;
    }
  }

};

export default apiService;

