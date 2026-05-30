import api from "./api";

export const predictionService = {
  // Kirim data assessment, dapat hasil prediksi
  async create(payload) {
    const { data } = await api.post("/predictions", payload);
    return data; // { status, message, data: { riskScore, stressLevel, ... } }
  },

  // Ambil riwayat (butuh login)
  async getAll(range) {
    const params = range ? { range } : {};
    const { data } = await api.get("/predictions", { params });
    return data;
  },

  // Ambil 1 prediksi by id
  async getById(id) {
    const { data } = await api.get(`/predictions/${id}`);
    return data;
  },

  // Hapus prediksi
  async delete(id) {
    const { data } = await api.delete(`/predictions/${id}`);
    return data;
  },
};
