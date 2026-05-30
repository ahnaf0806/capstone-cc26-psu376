import api from "./api";

export const authService = {
  // REGISTER
  async register({ name, email, password }) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return data;
  },

  //   LOGIN

  async login({ email, password }) {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });
    return data;
  },
};
