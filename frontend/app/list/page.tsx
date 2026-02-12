"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "../components/JobCard";
import { jobService } from "../../services/JobService"; // Pastikan path benar

interface Job {
  id: number;
  title: string;
  company_name?: string;
  location: string;
  type: string;
  experience: string;
  created_at: string;
  deadline: string;
}
export default function LowonganPage() {
  const [jobs, setJobs] = useState([] as Job[]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 1. Fetch data dari API saat mounted
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getAllJobs();
        // Laravel biasanya membungkus data dalam response.data atau response.data.data
        setJobs(response.data.data || response.data);
      } catch (err) {
        console.error("Gagal mengambil lowongan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2. Logika Pencarian (Frontend Filter)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <section className="bg-[#121212] text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#2D71FF] font-semibold text-sm md:text-base mb-4 tracking-wide">
            Dicoding Jobs
          </p>
          <h1 className="text-4xl md:text-7xl font-bold leading-[1.2] tracking-tight max-w-4xl">
            Temukan lowongan yang cocok untuk kamu
            <span className="inline-block align-middle ml-4">
              <div className="w-32 h-12 md:w-48 md:h-16 rounded-full overflow-hidden border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                  alt="Talent"
                  className="w-full h-full object-cover"
                />
              </div>
            </span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Daftar Pekerjaan Terbaru
          </h1>

          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari posisi atau perusahaan..."
              className="block w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Memuat lowongan...
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link href={`/list/${job.id}`} key={job.id} className="block mb-4">
              <JobCard
                title={job.title}
                company={job.company_name || "Perusahaan"} // Sesuaikan field API
                location={job.location}
                type={job.type}
                experience={job.experience}
                createdAt={new Date(job.created_at).toLocaleDateString(
                  "id-ID",
                  { day: "numeric", month: "long", year: "numeric" },
                )}
                deadline={new Date(job.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            Lowongan tidak ditemukan.
          </div>
        )}
      </div>
    </>
  );
}
