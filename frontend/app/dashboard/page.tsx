"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../components/JobCard";
import MyJobCard from "../components/MyJobCard";
import Sidebar from "../components/Sidebar";
import { jobService } from "@/services/JobService";

export default function DashboardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk melacak menu aktif: 'my-jobs' | 'saved' | 'applied'
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const adminStatus = user.is_admin === true || user.is_admin === 1;
      setIsAdmin(adminStatus);

      // Tentukan tab default berdasarkan role
      const initialTab = adminStatus ? "my-jobs" : "saved";
      setActiveTab(initialTab);
      fetchDashboardData(initialTab);
    }
    setMounted(true);
  }, []);

  const fetchDashboardData = async (tab: string) => {
    setLoading(true);
    try {
      let response;
      if (tab === "my-jobs") {
        response = await jobService.getMyJobs();
      } else if (tab === "saved") {
        response = await jobService.getSavedJobs();
      } else if (tab === "applied") {
        response = await jobService.getMyApplications();
      }

      // Laravel mengembalikan data dalam response.data.data
      setJobs(response?.data?.data || []);
    } catch (err) {
      console.error("Gagal mengambil data dashboard:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    fetchDashboardData(tab);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      try {
        await jobService.deleteJob(id);
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      <Sidebar
        isAdmin={isAdmin}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-8 md:p-12 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#2D3E50] capitalize">
              {activeTab.replace("-", " ")}
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
            {loading ? (
              <div className="text-center py-10 text-gray-400">
                Memuat data...
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((item) => {
                // Logic untuk menentukan data mana yang ditampilkan (karena struktur 'applied' beda)
                const jobData =
                  activeTab === "applied" ? item.job_vacancy : item;

                if (isAdmin) {
                  return (
                    <MyJobCard
                      key={item.id}
                      title={item.title}
                      dateCreated={item.created_at}
                      dateExpiry={item.active_until}
                      onEdit={() => router.push(`/edit-job/${item.id}`)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  );
                } else {
                  return (
                    <JobCard
                      key={item.id}
                      title={jobData.title}
                      company={jobData.company_name || "Perusahaan"}
                      location={jobData.location}
                      type={jobData.type}
                      experience={jobData.min_experience}
                      createdAt={jobData.created_at}
                      deadline={jobData.active_until}
                      // Pass status aplikasi jika di tab applied
                      status={activeTab === "applied" ? item.status : null}
                    />
                  );
                }
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed">
                <p className="text-gray-400">
                  Tidak ada data untuk ditampilkan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
