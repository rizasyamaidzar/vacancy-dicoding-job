"use client";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import MyJobCard from "../components/MyJobCard";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Ambil data user dari localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      // Pastikan key-nya sesuai dengan response API kamu (is_admin)
      setIsAdmin(user.is_admin === true || user.is_admin === 1);
    }

    setMounted(true);
  }, []);
  const adminJobs = [
    {
      id: 1,
      title: "Product Engineer",
      created: "15 Des 2023",
      expiry: "30 Des 2023",
    },
    {
      id: 2,
      title: "Android Engineer",
      created: "15 Des 2023",
      expiry: "30 Des 2023",
    },
  ];

  const candidateJobs = [
    {
      id: 1,
      title: "Android Developer",
      company: "Dicoding Indonesia",
      location: "Bandung",
      type: "Full-time",
      experience: "4-5 tahun",
      createdAt: "15 Des 2023",
      deadline: "30 Des 2023",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Dicoding Indonesia",
      location: "Jakarta (Remote)",
      type: "Contract",
      experience: "2-3 tahun",
      createdAt: "10 Jan 2024",
      deadline: "25 Jan 2024",
    },
  ];
  return (
    <>
      <div className="flex min-h-screen bg-[#F9FAFB] max-w-7xl mx-auto">
        <Sidebar isAdmin={isAdmin} />

        <div className="flex-1 flex flex-col">
          <div className="p-8 md:p-12 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#2D3E50]">
                {isAdmin ? "Lowongan Saya" : "Lowongan Tersimpan"}
              </h2>
              {isAdmin && (
                <a
                  href="/create-job"
                  className="bg-[#2D3E50] hover:bg-[#1e2a36] text-white px-5 py-2.5 rounded-md flex items-center gap-2 font-semibold text-sm transition-all shadow-md"
                >
                  <span className="text-xl leading-none">+</span> Buat lowongan
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {isAdmin
                ? adminJobs.map((job) => (
                    <MyJobCard
                      key={job.id}
                      title={job.title}
                      dateCreated={job.created}
                      dateExpiry={job.expiry}
                      onEdit={() => alert("Edit")}
                      onDelete={() => confirm("Hapus?")}
                    />
                  ))
                : candidateJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      type={job.type}
                      experience={job.experience}
                      createdAt={job.createdAt}
                      deadline={job.deadline}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
