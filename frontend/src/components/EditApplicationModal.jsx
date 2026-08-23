import React, { useState } from "react";

const EditApplicationModal = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    status: application.status || "Applied",
    priority: application.priority || "Medium",
    appliedAt: application.appliedAt
      ? application.appliedAt.substring(0, 10)
      : "",
    notes: application.notes || "",
    interviewDate: application.interviewDate
      ? application.interviewDate.substring(0, 10)
      : "",
    followUpDate: application.followUpDate
      ? application.followUpDate.substring(0, 10)
      : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(application._id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal */}
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Edit Application
            </h2>

            <p className="mt-1 text-slate-500">
              Update your application details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-8 py-6 space-y-6">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Job Title
              </label>

              <input
                type="text"
                value={application.job?.title || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 cursor-not-allowed"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Company
              </label>

              <input
                type="text"
                value={application.job?.company || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 cursor-not-allowed"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Applied Date */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Applied Date
              </label>

              <input
                type="date"
                name="appliedAt"
                value={formData.appliedAt}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Interview Date */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Interview Date
              </label>

              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Follow Up Date */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Follow-up Date
              </label>

              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                placeholder="Add notes about this application..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 resize-none outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-8 py-5 border-t border-slate-200 bg-white sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;