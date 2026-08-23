import React from "react";

const ApplicationView = ({ application, onClose }) => {
  if (!application) return null;

  const { job } = application;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {job?.title}
            </h2>

            <p className="mt-1 text-slate-600">
              {job?.company}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Application details */}
        <div className="p-6 space-y-6">

          {/* Status / Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="mt-1 font-semibold text-teal-600">
                {application.status || "Not specified"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Priority
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {application.priority || "Not specified"}
              </p>
            </div>

          </div>

          {/* Job information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Job Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-slate-500">
                  Location
                </p>
                <p className="font-medium text-slate-800">
                  {job?.location || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Job Type
                </p>
                <p className="font-medium text-slate-800">
                  {job?.jobType || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Work Mode
                </p>
                <p className="font-medium text-slate-800">
                  {job?.workMode || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Salary
                </p>
                <p className="font-medium text-slate-800">
                  {job?.salary || "Not specified"}
                </p>
              </div>

            </div>
          </div>

          {/* Application dates */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Application Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-slate-500">
                  Applied Date
                </p>

                <p className="font-medium text-slate-800">
                  {application.appliedAt
                    ? new Date(application.appliedAt).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Interview Date
                </p>

                <p className="font-medium text-slate-800">
                  {application.interviewDate
                    ? new Date(
                        application.interviewDate
                      ).toLocaleDateString()
                    : "Not scheduled"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Follow-up Date
                </p>

                <p className="font-medium text-slate-800">
                  {application.followUpDate
                    ? new Date(
                        application.followUpDate
                      ).toLocaleDateString()
                    : "Not scheduled"}
                </p>
              </div>

            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Notes
            </h3>

            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
              {application.notes || "No notes added."}
            </div>
          </div>

          {/* Job link */}
          {job?.jobLink && (
            <div>
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-5 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
              >
                View Original Job
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplicationView;