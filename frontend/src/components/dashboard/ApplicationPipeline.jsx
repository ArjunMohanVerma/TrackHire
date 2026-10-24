const PIPELINE_STAGES = [
  { label: "Saved", color: "bg-slate-400" },
  { label: "Applied", color: "bg-blue-500" },
  { label: "Shortlisted", color: "bg-cyan-500" },
  { label: "Screening", color: "bg-indigo-500" },
  { label: "Interview", color: "bg-violet-500" },
  { label: "Technical Round", color: "bg-purple-500" },
  { label: "HR Round", color: "bg-pink-500" },
  { label: "Offer", color: "bg-emerald-500" },
  { label: "Hired", color: "bg-green-600" },
  { label: "Rejected", color: "bg-red-500" },
  { label: "Withdrawn", color: "bg-orange-500" },
];

const ApplicationPipeline = ({ pipeline = {} }) => {
  const totalApplications = Object.values(pipeline).reduce(
    (total, count) => total + (Number(count) || 0),
    0,
  );

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Application Pipeline
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Track your progress across application stages.
        </p>
      </div>

      {totalApplications === 0 ? (
        <div className="py-6 text-center">
          <p className="font-medium text-slate-700">No applications yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first application to see your pipeline here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
          {PIPELINE_STAGES.map((stage) => {
            const count = Number(pipeline[stage.label]) || 0;
            const percentage = (count / totalApplications) * 100;

            return (
              <div key={stage.label} className="min-w-0">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${stage.color}`}
                    />
                    <span className="truncate text-xs font-medium text-slate-700 sm:text-sm">
                      {stage.label}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs tabular-nums text-slate-500">
                    {count} ({Math.round(percentage)}%)
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-600">
            Total tracked applications
          </span>
          <span className="text-lg font-bold text-slate-900">
            {totalApplications}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPipeline;
