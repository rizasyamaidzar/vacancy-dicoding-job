"use client";
import React, { useState } from "react";
export interface JobData {
  title: string;
  position: string;
  type: "Full-Time" | "Part-Time" | "Kontrak" | "Intern";
  candidates: string;
  expiry: string;
  location: string;
  isRemote: boolean;
  description: string;
  minSalary: string;
  maxSalary: string;
  showSalary: boolean;
  experience:
    | "Kurang dari 1 tahun"
    | "1-3 tahun"
    | "4-5 tahun"
    | "6-10 tahun"
    | "Lebih dari 10 tahun";
}
interface JobFormProps {
  initialData?: Partial<JobData>; // Anda bisa mendefinisikan tipe data yang lebih spesifik
  onSubmit: (data: JobData) => void;
  buttonLabel: string;
}

const JobForm = ({ initialData, onSubmit, buttonLabel }: JobFormProps) => {
  const [formData, setFormData] = useState<JobData>({
    title: initialData?.title || "",
    position: initialData?.position || "",
    type: initialData?.type || "Full-Time",
    candidates: initialData?.candidates || "",
    expiry: initialData?.expiry || "",
    location: initialData?.location || "",
    isRemote: initialData?.isRemote || false,
    description: initialData?.description || "",
    minSalary: initialData?.minSalary || "",
    maxSalary: initialData?.maxSalary || "",
    showSalary: initialData?.showSalary || false,
    experience: initialData?.experience || "1-3 tahun",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      (e.target as HTMLInputElement).type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-6 max-w-3xl pb-10"
    >
      {/* Judul Lowongan */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Judul lowongan <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded-md outline-none focus:border-blue-500"
          placeholder="Masukkan judul lowongan"
          required
        />
        <p className="text-xs text-gray-400 mt-1">
          Contoh: Android Native Developer
        </p>
      </div>

      {/* Posisi */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Posisi <span className="text-red-500">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded-md outline-none bg-white"
        >
          <option value="">Pilih posisi yang dicari</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
        </select>
      </div>

      {/* Tipe Pekerjaan (Radio) */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Tipe pekerjaan <span className="text-red-500">*</span>
        </label>
        {["Full-Time", "Part-Time", "Kontrak", "Intern"].map((item) => (
          <div key={item} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="type"
              value={item}
              checked={formData.type === item}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-600">{item}</label>
          </div>
        ))}
      </div>

      {/* Deskripsi (Rich Text Placeholder) */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Deskripsi <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="bg-gray-50 p-2 border-b border-gray-200 flex gap-4 text-gray-500">
            {/* Toolbar icons placeholder */}
            <span className="font-bold">B</span> <i>I</i> <u>U</u> 🔗 🖼️
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 min-h-[200px] outline-none"
            placeholder="Tuliskan deskripsi pekerjaan..."
          />
        </div>
      </div>

      {/* Rentang Gaji */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Rentang gaji per bulan <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex border border-gray-200 rounded-md overflow-hidden">
            <span className="bg-gray-100 px-3 py-2 text-gray-500 text-sm">
              Rp
            </span>
            <input
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Minimum"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex-1 flex border border-gray-200 rounded-md overflow-hidden">
            <span className="bg-gray-100 px-3 py-2 text-gray-500 text-sm">
              Rp
            </span>
            <input
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              placeholder="Maksimum (opsional)"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-100">
        <button
          type="submit"
          className="bg-[#2D3E50] text-white px-8 py-2.5 rounded text-sm font-semibold hover:bg-[#1e2a36]"
        >
          {buttonLabel}
        </button>
        <button
          type="button"
          className="text-blue-600 px-8 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-all"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default JobForm;
