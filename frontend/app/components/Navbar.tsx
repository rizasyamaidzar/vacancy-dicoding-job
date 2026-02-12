"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authService } from "../../services/AuthService";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const activeClass = (path: string) =>
    pathname === path
      ? "text-gray-600 border-b-2 border-gray-600 "
      : "text-gray-500 hover:text-gray-600";

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    syncAuth();
    setMounted(true);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      try {
        await authService.logout();
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("Logout gagal:", error);
      }
    }
  };

  if (!mounted) {
    return (
      <header className="border-b bg-white h-16">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center">
          <div className="flex items-center gap-2 font-semibold text-lg text-gray-800 opacity-50">
            <img
              src="https://d17ivq9b7rppb3.cloudfront.net/original/commons/new-ui-logo.png"
              className="w-8 h-8"
              alt="Logo"
            />
            <span>Jobs</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
          <Link href="/list" className="flex items-center gap-2">
            <img
              src="https://d17ivq9b7rppb3.cloudfront.net/original/commons/new-ui-logo.png"
              alt="Logo"
              className="w-8 h-8"
            />
            <span>Jobs</span>
          </Link>
          {isLoggedIn && (
            <div className="flex items-center gap-6 ml-8 text-sm h-16">
              <Link
                href="/list"
                className={`transition-all duration-200 h-full flex items-center ${activeClass("/list")}`}
              >
                Lowongan Kerja
              </Link>
              <Link
                href="/dashboard"
                className={`transition-all duration-200 h-full flex items-center ${activeClass("/dashboard")}`}
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              href="/"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Masuk
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
