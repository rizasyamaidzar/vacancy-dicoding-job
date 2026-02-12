"use client";
import React, { useState, useEffect, useRef } from "react";

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
  initialData?: Partial<JobData>;
  onSubmit: (data: JobData) => void;
  buttonLabel: string;
}

const QUILL_JS = "https://cdn.quilljs.com/1.3.6/quill.js";
const QUILL_CSS = "https://cdn.quilljs.com/1.3.6/quill.snow.css";

const JobForm = ({ initialData, onSubmit, buttonLabel }: JobFormProps) => {
  const [formData, setFormData] = useState<JobData>({
    title: initialData?.title || "",
    position: initialData?.position || "",
    type: initialData?.type || "Full-Time",
    candidates: initialData?.candidates || "",
    expiry: initialData?.expiry || "",
    location: initialData?.location || "",
    isRemote: initialData?.isRemote || false,
    description:
      initialData?.description ||
      `
      <h3>Deskripsi Pekerjaan</h3>
      <p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p>
      <h3>Tanggung Jawab</h3>
      <ul>
        <li>Membuat atau memodifikasi program yang sudah ada.</li>
        <li>Bertanggung jawab dalam mengelola program.</li>
      </ul>
    `,
    minSalary: initialData?.minSalary || "",
    maxSalary: initialData?.maxSalary || "",
    showSalary: initialData?.showSalary || false,
    experience: initialData?.experience || "1-3 tahun",
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  useEffect(() => {
    if (!document.getElementById("quill-css")) {
      const link = document.createElement("link");
      link.id = "quill-css";
      link.rel = "stylesheet";
      link.href = QUILL_CSS;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = QUILL_JS;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (editorRef.current && !quillInstance.current) {
        // @ts-ignore
        quillInstance.current = new window.Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              ["bold", "italic", "underline"],
              ["link", "image", "code-block"],
            ],
          },
        });
        quillInstance.current.root.innerHTML = formData.description;
        quillInstance.current.on("text-change", () => {
          setFormData((prev) => ({
            ...prev,
            description: quillInstance.current.root.innerHTML,
          }));
        });
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-8 max-w-3xl pb-20 text-gray-600"
    >
      {/* 1. Judul Lowongan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Judul lowongan <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Masukkan judul lowongan"
          required
        />
        <p className="text-xs text-gray-400 mt-2">
          Contoh: Android Native Developer
        </p>
      </div>

      {/* 2. Posisi */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Posisi <span className="text-red-500">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none appearance-none"
          required
        >
          <option value="">Pilih posisi yang dicari</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
        </select>
      </div>

      {/* 3. Tipe Pekerjaan */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Tipe pekerjaan <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["Full-Time", "Part-Time", "Kontrak", "Intern"].map((t) => (
            <label key={t} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                checked={formData.type === t}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Kandidat yang dibutuhkan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Kandidat yang dibutuhkan <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="candidates"
          value={formData.candidates}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none"
          placeholder="Masukkan jumlah kandidat yang dibutuhkan"
          required
        />
      </div>

      {/* 5. Aktif hingga */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Aktif hingga <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none uppercase text-xs"
          required
        />
      </div>

      {/* 6. Lokasi */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Lokasi <span className="text-red-500">*</span>
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none mb-3"
          required
        >
          <option value="">Pilih lokasi</option>
          <option value="Bandung">Bandung</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Remote">Remote</option>
        </select>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isRemote"
            checked={formData.isRemote}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm">Bisa remote</span>
        </label>
      </div>

      {/* 7. Deskripsi */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Deskripsi <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <div ref={editorRef} style={{ height: "300px" }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">
          Anda bisa mengubah templat yang telah disediakan di atas.
        </p>
      </div>

      {/* 8. Rentang Gaji */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Rentang gaji per bulan <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
            <span className="bg-gray-50 px-4 py-3 text-sm border-r border-gray-200">
              Rp
            </span>
            <input
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              className="flex-1 p-3 outline-none"
              placeholder="Minimum"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex flex-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
            <span className="bg-gray-50 px-4 py-3 text-sm border-r border-gray-200">
              Rp
            </span>
            <input
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              className="flex-1 p-3 outline-none"
              placeholder="Maksimum (opsional)"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Anda tidak perlu mengisi kolom "Maksimum" jika yang dimasukkan adalah
          gaji pokok.
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div
            className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${formData.showSalary ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() =>
              setFormData({ ...formData, showSalary: !formData.showSalary })
            }
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-all ${formData.showSalary ? "translate-x-5" : ""}`}
            ></div>
          </div>
          <span className="text-sm">Tampilkan gaji</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 italic">
          Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh
          kandidat.
        </p>
      </div>

      {/* 9. Minimal Pengalaman */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Minimum pengalaman bekerja <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {[
            "Kurang dari 1 tahun",
            "1-3 tahun",
            "4-5 tahun",
            "6-10 tahun",
            "Lebih dari 10 tahun",
          ].map((exp) => (
            <label key={exp} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="experience"
                value={exp}
                checked={formData.experience === exp}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm">{exp}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all uppercase tracking-wider"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default JobForm;
