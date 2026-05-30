import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isLoggedIn: false,

      // Actions
      setAuth: ({ user, token }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, token, isLoggedIn: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null, isLoggedIn: false });
      },

      // Inisialisasi dari localStorage saat app load
      initAuth: () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({ user, token, isLoggedIn: true });
          } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
