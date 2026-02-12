"use client";

import React, { useEffect, useState } from "react";
import { jobService } from "../../../services/JobService";
import { useParams, useRouter } from "next/navigation";

interface JobDetail {
  id: number;
  title: string;
  company_name: string;
  sector?: string;
  location: string;
  employees?: string;
  type: string;
  min_experience: string;
  candidates_needed?: number;
  description: string;
  is_saved?: boolean; // Pastikan backend mengirim status ini atau kita cek manual
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Form Lamaran
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await jobService.getJobById(id);
        const data = response.data.data || response.data;
        setJob(data);
        // Jika API belum mengirim status saved, kita bisa cek dari list getSavedJobs (opsional)
        setIsSaved(data.is_saved || false);
      } catch (err) {
        console.error("Gagal mengambil detail pekerjaan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetail();
  }, [id]);

  // Handler Save / Unsave
  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await jobService.unSaveJob(id);
        setIsSaved(false);
        alert("Pekerjaan dihapus dari daftar simpan.");
      } else {
        await jobService.saveJob(id);
        setIsSaved(true);
        alert("Pekerjaan berhasil disimpan!");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memproses permintaan");
    }
  };

  // Handler Submit Lamaran
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return alert("Harap unggah resume Anda!");

    setSubmitting(true);
    try {
      const payload = { resume, cover_letter: coverLetter };
      await jobService.applyJob(id, payload);
      alert("Lamaran berhasil dikirim!");
      setIsModalOpen(false);
      router.push("/dashboard"); // Arahkan ke dashboard untuk cek status
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengirim lamaran");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data tidak ditemukan.
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <header className="border-b border-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-6">
            <div className="w-20 h-20 bg-[#253343] rounded-lg flex items-center justify-center text-white font-bold text-xs text-center p-2">
              {job.company_name}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-1">
                Sektor: {job.sector || "Teknologi"}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span>🏢 {job.company_name}</span>
                <span>📍 {job.location}</span>
              </div>
            </div>
          </div>

          {/* Tombol Simpan */}
          <button
            onClick={handleSaveToggle}
            className={`px-6 py-2 rounded-lg border transition-all ${isSaved ? "bg-yellow-50 border-yellow-400 text-yellow-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            {isSaved ? "⭐ Tersimpan" : "☆ Simpan"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-6 md:px-12">
        <div className="mb-8">
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            {job.type}
          </span>
        </div>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <div
              className="text-gray-700 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          <div className="border-t pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900">Minimal Pengalaman</h3>
              <p className="text-gray-700">{job.min_experience}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Kebutuhan</h3>
              <p className="text-gray-700">
                {job.candidates_needed || 1} kandidat
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Lamar Sekarang
          </button>
        </section>
      </main>

      {/* MODAL APPLY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Kirim Lamaran
            </h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Resume (PDF/DOCX) *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setResume(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cover Letter (Opsional)
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-3 h-32 outline-none focus:border-blue-500 text-gray-700"
                  placeholder="Ceritakan mengapa Anda cocok untuk posisi ini..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {submitting ? "Mengirim..." : "Kirim Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
