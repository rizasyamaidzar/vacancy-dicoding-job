"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { jobService } from "@/services/JobService";
import JobForm, { JobData } from "../../components/JobForm";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [initialData, setInitialData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data lama untuk mengisi form
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJobById(id);
        const data = response.data.data;

        // Mapping dari API (snake_case) ke format Form (camelCase)
        setInitialData({
          title: data.title,
          position: data.position,
          type: data.type,
          candidates: data.candidates_needed.toString(),
          expiry: data.active_until,
          location: data.location,
          isRemote: !!data.is_remote,
          description: data.description,
          experience: data.min_experience,
          // Field tambahan jika ada di form
          minSalary: data.min_salary || "",
          maxSalary: data.max_salary || "",
          showSalary: !!data.show_salary,
        });
      } catch (err) {
        console.error("Gagal mengambil data lowongan:", err);
        alert("Data tidak ditemukan");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id, router]);

  // 2. Fungsi Update
  const handleUpdate = async (data: JobData) => {
    try {
      const payload = {
        title: data.title,
        position: data.position,
        type: data.type,
        candidates_needed: parseInt(data.candidates),
        active_until: data.expiry,
        location: data.location,
        is_remote: data.isRemote,
        description: data.description,
        min_experience: data.experience,
      };

      const response = await jobService.updateJob(id, payload);

      if (response.status === 200) {
        alert("Lowongan berhasil diperbarui!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Gagal memperbarui lowongan:", err);
      alert(
        err.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data",
      );
    }
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <>
      <section className="bg-[#121212] text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Edit lowongan pekerjaan
          </h2>
          <div className="max-w-2xl">
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Perbarui informasi lowongan Anda untuk mendapatkan talenta
              terbaik.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6">
        {initialData && (
          <JobForm
            onSubmit={handleUpdate}
            initialData={initialData}
            buttonLabel="Simpan Perubahan"
          />
        )}
      </div>
    </>
  );
}
