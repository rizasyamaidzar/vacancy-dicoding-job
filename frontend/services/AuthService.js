import api from "@/lib/axios";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    const result = response.data;
    console.log("Token ditemukan:", result.access_token);
    localStorage.setItem("token", result.access_token);
    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("isAdmin", JSON.stringify(result.user.is_admin));
    console.log("User ditemukan:", result.user);
    console.log("isAdmin ditemukan:", result.user.is_admin);
    window.dispatchEvent(new Event("storage"));
    return response.data;
  },
  logout: async () => {
    try {
      await api.post("/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      window.location.href = "/";
    }
  },
  getProfile: () => api.get("/me"),
};
