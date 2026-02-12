// components/MyJobCard.tsx
import React from "react";

interface MyJobCardProps {
  title: string;
  dateCreated: string;
  dateExpiry: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MyJobCard = ({
  title,
  dateCreated,
  dateExpiry,
  onEdit,
  onDelete,
}: MyJobCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm mb-1">
      <div className="w-16 h-16 bg-[#2D3E50] rounded flex items-center justify-center shrink-0">
        <span className="text-white text-2xl font-bold text-opacity-80">g</span>
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          {title}
        </h3>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            <span>Dibuat: {dateCreated}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>Aktif hingga: {dateExpiry}</span>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-[#FEE2E2] hover:bg-red-200 transition-colors text-[#DC2626] rounded-md text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyJobCard;
