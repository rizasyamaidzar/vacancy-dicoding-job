"use client";
import React from "react";

interface SidebarProps {
  isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-100 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 relative">
          <div className="absolute -top-6 left-20 w-24 h-24 opacity-80 pointer-events-none">
            <img src="/pattern.svg" alt="" />
          </div>
          <h1 className="text-3xl font-bold text-gray-700 z-10">Jobs</h1>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {isAdmin ? (
          <div className="bg-[#F3F4F6] flex items-center gap-3 px-8 py-4 text-[#121212] font-semibold border-r-4 border-blue-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>Lowongan Saya</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 px-8 py-4 text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>Lowongan Tersimpan</span>
            </div>
            <div className="flex items-center gap-3 px-8 py-4 text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Lowongan di Apply</span>
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}
