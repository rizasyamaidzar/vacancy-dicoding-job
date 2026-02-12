"use client";

import React, { useEffect, useState } from "react";
import { jobService } from "../../../services/JobService";
import { useParams } from "next/navigation";

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
  requirements?: string;
  core_values?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await jobService.getJobById(id);
        // Sesuaikan dengan struktur data Laravel (biasanya response.data.data)
        setJob(response.data.data || response.data);
      } catch (err) {
        console.error("Gagal mengambil detail pekerjaan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Memuat detail pekerjaan...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Pekerjaan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-[#253343] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-xs text-center p-2">
            {job.company_name}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600 mt-1">
              Sektor Bisnis: {job.sector || "Teknologi"}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                🏢 {job.company_name}
              </span>
              <span className="flex items-center gap-1">📍 {job.location}</span>
              <span className="flex items-center gap-1">
                👥 {job.employees || "50-100"} Karyawan
              </span>
            </div>
          </div>
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
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </div>

          <h3 className="font-bold text-gray-900 border-t pt-8 ">
            Informasi tambahan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900">Pengalaman bekerja</h3>
              <p className="text-gray-700">{job.min_experience}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                Kandidat yang dibutuhkan
              </h3>
              <p className="text-gray-700">
                {job.candidates_needed || 1} kandidat
              </p>
            </div>
          </div>

          <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            Lamar Sekarang
          </button>
        </section>
      </main>
    </div>
  );
}
