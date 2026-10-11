import { Link } from "react-router-dom";
import { UserRound, ArrowRight, CheckCircle2 } from "lucide-react";

const ProfileCompletion = ({ completion = 0 }) => {
  const percentage = Math.min(
    100,
    Math.max(0, Number(completion) || 0)
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3">
          <UserRound className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Profile Completion
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Make your profile stand out to recruiters.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg
            className="-rotate-90"
            viewBox="0 0 100 100"
            aria-label={`Profile ${percentage}% complete`}
            role="img"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-100"
            />

            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={
                2 * Math.PI * 40 * (1 - percentage / 100)
              }
              className="text-blue-600 transition-all duration-700"
            />
          </svg>

          <span className="absolute text-xl font-bold text-slate-900">
            {percentage}%
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-800">
            {percentage === 100
              ? "Profile completed!"
              : percentage >= 70
                ? "Looking good!"
                : percentage >= 40
                  ? "You're making progress!"
                  : "Let's get started!"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {percentage === 100
              ? "Your profile is complete. Keep it updated."
              : "Add your missing details to build a stronger professional profile."}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600">Completion progress</span>
          <span className="font-medium text-slate-800">
            {percentage} / 100
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Profile completion"
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <Link
        to="/profile"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        {percentage === 100 ? "View Profile" : "Complete Your Profile"}
        {percentage === 100 ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </Link>
    </div>
  );
};

export default ProfileCompletion;