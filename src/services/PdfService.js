import api from "../http";

export default class PdfService {
  static async addDbFile(formData) {    
    return await api.post('/pdf/addfile', formData, {
        headers: { "Content-Type": "multipart/form-data" },      
    });
  }

  static async getProductByCode(code) {    
    return await api.get(`/pdf/product/${code}`);
  }
}
