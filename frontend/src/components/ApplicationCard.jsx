import React from "react";

const ApplicationCard = ({
  application,
  onView,
  onEdit,
  onDelete,
}) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-blue-50 text-blue-700";

      case "screening":
        return "bg-yellow-50 text-yellow-700";

      case "interview":
        return "bg-purple-50 text-purple-700";

      case "offer":
        return "bg-green-50 text-green-700";

      case "hired":
        return "bg-emerald-50 text-emerald-700";

      case "rejected":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600";

      case "medium":
        return "text-yellow-600";

      case "low":
        return "text-green-600";

      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {application.job?.title || "Untitled Job"}
          </h3>

          <p className="mt-1 text-slate-600">
            {application.job?.company || "Unknown Company"}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
            application.status
          )}`}
        >
          {application.status || "Unknown"}
        </span>
      </div>

      {/* Job information */}
      <div className="mt-5 space-y-2 text-sm text-slate-600">

        {application.job?.location && (
          <p>
            <span className="font-medium text-slate-700">
              Location:
            </span>{" "}
            {application.job.location}
          </p>
        )}

        {application.job?.jobType && (
          <p>
            <span className="font-medium text-slate-700">
              Job Type:
            </span>{" "}
            {application.job.jobType}
          </p>
        )}

        {application.job?.workMode && (
          <p>
            <span className="font-medium text-slate-700">
              Work Mode:
            </span>{" "}
            {application.job.workMode}
          </p>
        )}

        {/* Priority */}
        <p>
          <span className="font-medium text-slate-700">
            Priority:
          </span>{" "}
          <span
            className={`font-semibold ${getPriorityStyle(
              application.priority
            )}`}
          >
            {application.priority || "Not set"}
          </span>
        </p>

        {/* Applied date */}
        {application.appliedAt && (
          <p>
            <span className="font-medium text-slate-700">
              Applied:
            </span>{" "}
            {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        )}

        {/* Interview date */}
        {application.interviewDate && (
          <p>
            <span className="font-medium text-slate-700">
              Interview:
            </span>{" "}
            {new Date(
              application.interviewDate
            ).toLocaleDateString()}
          </p>
        )}

        {/* Follow-up date */}
        {application.followUpDate && (
          <p>
            <span className="font-medium text-slate-700">
              Follow-up:
            </span>{" "}
            {new Date(
              application.followUpDate
            ).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            {application.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() => onView(application._id)}
          className="flex-1 min-w-25 px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
        >
          View
        </button>

        <button
          onClick={() => onEdit(application)}
          className="flex-1 min-w-25 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(application)}
          className="flex-1 min-w-25 px-4 py-2 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default ApplicationCard;
