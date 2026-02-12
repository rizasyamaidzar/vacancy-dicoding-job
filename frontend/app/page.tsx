"use client";
import { useState } from "react";
import { authService } from "../services/AuthService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      const user = response.user;

      router.refresh();
      router.push("/list");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login gagal, silakan cek kembali email & password Anda",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm mb-2">
          Masuk untuk melanjutkan ke:
        </p>
        <h1 className="text-2xl font-bold text-gray-800">Dicoding Jobs</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              className="text-gray-400 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Lupa Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="Password"
              required
              className="text-gray-400 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#324559] hover:bg-[#263544] text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {isLoading ? "Mohon Tunggu..." : "Masuk"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Dengan melakukan login, Anda setuju dengan{" "}
            <a href="#" className="text-blue-600 underline">
              syarat & ketentuan
            </a>{" "}
            Dicoding.
          </p>
        </div>
      </div>
    </div>
  );
}
