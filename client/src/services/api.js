import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = {
    getFilesData: async (fileName = null) => {
    try {
      const url = `${API_BASE_URL}/files/data`;
      const params = fileName ? { fileName } : {};
      
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching files data:', error);
      throw error;
    }
  },

  getFilesList: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files/list`);
      return response.data.files || [];
    } catch (error) {
      console.error('Error fetching files list:', error);
      throw error;
    }
  }
};

export default api;