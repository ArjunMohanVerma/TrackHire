import { useState } from "react";
import { CalendarDays, Clock, ChevronRight } from "lucide-react";

const UpcomingFollowUps = ({ followUps = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const validFollowUps = followUps
    .filter((item) => item.followUpDate)
    .filter((item) => new Date(item.followUpDate) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.followUpDate) - new Date(b.followUpDate)
    );

  if (validFollowUps.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Upcoming Follow-ups
        </h2>
        <p className="mt-4 text-sm text-slate-500">
          No upcoming follow-ups. You're all caught up!
        </p>
      </div>
    );
  }

  const safeIndex = Math.min(
    currentIndex,
    validFollowUps.length - 1
  );

  const followUp = validFollowUps[safeIndex];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Upcoming Follow-ups
        </h2>

        <span className="text-sm text-slate-500">
          {safeIndex + 1} of {validFollowUps.length}
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <h3 className="font-semibold text-slate-800">
          {followUp.job?.title || followUp.jobTitle || "Job follow-up"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {followUp.job?.company || followUp.company || "Company not specified"}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          <span>
            {new Date(followUp.followUpDate).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>

        {followUp.notes && (
          <p className="mt-3 text-sm text-slate-600">
            {followUp.notes}
          </p>
        )}
      </div>

      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev + 1 < validFollowUps.length ? prev + 1 : 0
          )
        }
        className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        Next follow-up
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default UpcomingFollowUps;