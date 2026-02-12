"use client";
import { jobService } from "@/services/JobService";
import JobForm, { JobData } from "../components/JobForm";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();
  const handleCreate = async (data: JobData) => {
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

      const response = await jobService.createJob(payload);

      if (response.status === 201 || response.status === 200) {
        alert("Lowongan berhasil dibuat!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Gagal membuat lowongan:", err);
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat menyimpan data",
      );
    }
  };
  return (
    <>
      <section className="bg-[#121212] text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            {/* Judul Utama */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Buat lowongan pekerjaan
            </h2>

            {/* Pill-shaped Image Element */}
            <div className="hidden md:block relative w-64 h-20 rounded-full overflow-hidden border border-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                alt="Talent illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="max-w-2xl">
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Dicoding Jobs menghubungkan industri dengan talenta yang tepat.
              Mencari tim baru tidak harus melelahkan dan boros biaya.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto p-6">
        <JobForm onSubmit={handleCreate} buttonLabel="Buat lowongan" />
      </div>
    </>
  );
}
