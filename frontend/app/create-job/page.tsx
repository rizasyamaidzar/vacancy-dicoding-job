"use client";
import JobForm, { JobData } from "../components/JobForm";

export default function CreateJobPage() {
  const handleCreate = (data: JobData) => {
    console.log("Simpan data baru:", data);
    // Panggil API POST disini
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
