const STATUS_STYLES = {
  Saved: "bg-slate-100 text-slate-700",
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-cyan-100 text-cyan-700",
  Screening: "bg-indigo-100 text-indigo-700",
  Interview: "bg-violet-100 text-violet-700",
  "Technical Round": "bg-purple-100 text-purple-700",
  "HR Round": "bg-pink-100 text-pink-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Hired: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-orange-100 text-orange-700",
};

const RecentApplications = ({ applications = [] }) => {
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.appliedDate || 0) -
        new Date(a.createdAt || a.appliedDate || 0)
    )
    .slice(0, 5);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of your latest applications.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {applications.length} total
        </span>
      </div>

      {recentApplications.length === 0 ? (
        <div className="py-8 text-center">
          <p className="font-medium text-slate-700">
            No applications yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your recent applications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentApplications.map((application) => {
            const job = application.job || {};
            const status = application.status || "Saved";

            return (
              <div
                key={application._id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-800">
                    {job.title || application.jobTitle || "Untitled position"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.company ||
                      application.company ||
                      "Company not specified"}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Applied:{" "}
                    {formatDate(
                      application.appliedDate || application.createdAt
                    )}
                  </p>
                </div>

                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_STYLES[status] ||
                    "bg-slate-100 text-slate-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentApplications;