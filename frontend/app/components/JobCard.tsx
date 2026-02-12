type JobCardProps = {
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  createdAt: string;
  deadline: string;
  logoUrl?: string;
};

export default function JobCard({
  title,
  company,
  location,
  type,
  experience,
  createdAt,
  deadline,
  logoUrl,
}: JobCardProps) {
  return (
    <div className="bg-white border rounded-sm p-5 flex justify-between items-start hover:shadow-md transition mb-2">
      <div className="flex gap-4">
        <div className="w-14 h-14 bg-slate-700 text-white flex items-center justify-center rounded">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            company.charAt(0)
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-500">{title}</h3>

          <p className="text-sm text-gray-600">
            {company} • {type}
          </p>

          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span>📍 {location}</span>
            <span>💼 {experience}</span>
          </div>
        </div>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>Dibuat pada {createdAt}</p>
        <p className="text-gray-500">Lamar sebelum {deadline}</p>
      </div>
    </div>
  );
}
