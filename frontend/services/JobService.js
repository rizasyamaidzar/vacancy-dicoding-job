import api from "@/lib/axios";

export const jobService = {
  getAllJobs: () => api.get("/jobs"),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (payload) => api.post("/jobs", payload),
  getMyJobs: () => api.get("/my-jobs"),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  updateJob: (id, payload) => api.put(`/jobs/${id}`, payload),
  saveJob: (id) => api.post(`/save/${id}`),
  unSaveJob: (id) => api.post(`/unsave/${id}`),
  getSavedJobs: () => api.get("/saved-jobs"),
  applyJob: (id, payload) => {
    const formData = new FormData();
    formData.append("resume", payload.resume); // File object
    formData.append("cover_letter", payload.cover_letter);

    return api.post(`/jobs/${id}/apply`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getMyApplications: () => api.get("/my-applications"),
};
