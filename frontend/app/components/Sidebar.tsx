"use client";
import React from "react";

interface SidebarProps {
  isAdmin: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({
  isAdmin,
  activeTab,
  onTabChange,
}: SidebarProps) {
  // Style Helper
  const getLinkClass = (tabName: string) => {
    const baseClass =
      "flex items-center gap-3 px-8 py-4 font-medium cursor-pointer transition-all border-r-4";
    return activeTab === tabName
      ? `${baseClass} bg-[#F3F4F6] text-[#121212] font-semibold`
      : `${baseClass} text-gray-500 hover:bg-gray-50 border-transparent`;
  };

  return (
    <aside className="w-64 border-r border-gray-100 hidden md:flex flex-col h-screen sticky top-0 ">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-700">Jobs</h1>
      </div>

      <nav className="mt-8 space-y-1">
        {isAdmin ? (
          /* MENU ADMIN */
          <div
            onClick={() => onTabChange("my-jobs")}
            className={getLinkClass("my-jobs")}
          >
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
          /* MENU CANDIDATE */
          <>
            <div
              onClick={() => onTabChange("saved")}
              className={getLinkClass("saved")}
            >
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

            <div
              onClick={() => onTabChange("applied")}
              className={getLinkClass("applied")}
            >
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
