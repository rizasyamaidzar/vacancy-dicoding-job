import api from "@/lib/axios";

export const jobService = {
  getAllJobs: () => api.get("/jobs"),
  getJobById: (id) => api.get(`/jobs/${id}`),
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
