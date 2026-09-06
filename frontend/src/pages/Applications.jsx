import React, { useEffect, useState } from "react";
import {
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationView from "../components/ApplicationView";
import EditApplicationModal from "../components/EditApplicationModal";
import ApplicationDeleteModal from "../components/ApplicationDeleteModal";
import Toast from "../components/Toast";

const Applications = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleView = async (id) => {
    try {
      setViewLoading(true);

      const data = await getApplicationById(id);
      setSelectedApplication(data.application);
      console.log("Application details:", data.application);
    } catch (error) {
      console.error("Error fetching application:", error);

      alert(
        error.response?.data?.message || "Unable to fetch application details.",
      );
    } finally {
      setViewLoading(false);
    }
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateApplication(id, data);

      setApplications((prev) =>
        prev.map((application) =>
          application._id === id ? response.application : application,
        ),
      );

      setEditingApplication(null);

      setToast({
        type: "success",
        message: "Application updated successfully!",
      });
    } catch (error) {
      console.error("Error Updating Application:", error);

      setToast({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to update the application at the moment.",
      });
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteApplication(id);

      setApplications((prev) =>
        prev.filter((application) => application._id !== id),
      );
      setDeletingApplication(null);

      setToast({
        type: "success",
        message: "Application deleted successfully!",
      });
    } catch (error) {
      console.log("Error deleting applicatin:", error.message);
      setToast({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to delete application at the moment!",
      });
    }
  };

  const handleDeleteClick = (application) => {
    setDeletingApplication(application);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getApplications();

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);

        setError("Unable to fetch applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 font-medium">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-teal-600 font-semibold mb-2">
            TRACK YOUR PROGRESS
          </p>

          <h1 className="text-4xl font-bold text-slate-900">My Applications</h1>

          <p className="mt-3 text-slate-500">
            Keep track of every job application in one place.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Applications</h2>

          <p className="text-slate-500 mt-1">
            {applications.length} applications found
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h3 className="text-xl font-semibold text-slate-800">
              No applications yet
            </h3>

            <p className="mt-2 text-slate-500">
              Start tracking jobs to see your applications here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {applications.map((application) => (
              <ApplicationCard
                application={application}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                key={application._id}
              />
            ))}
          </div>
        )}
      </section>
      {/* //editing application and showing editing modal */}
      {editingApplication && (
        <EditApplicationModal
          application={editingApplication}
          onClose={() => {
            setEditingApplication(null);
          }}
          onSave={handleUpdate}
        />
      )}
      {/* //showing application modal */}
      {selectedApplication && (
        <ApplicationView
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}

      {deletingApplication && <ApplicationDeleteModal deletingApplication={deletingApplication}
    setDeletingApplication={setDeletingApplication}
    onConfirmDelete={handleConfirmDelete}/>}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {viewLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
            Loading application...
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
