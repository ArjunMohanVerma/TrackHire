import React, { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <p className="text-slate-600 font-medium">
          Loading applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">
          {error}
        </p>
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

          <h1 className="text-4xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="mt-3 text-slate-500">
            Keep track of every job application in one place.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Applications
          </h2>

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
              <div
                key={application._id}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {application.job?.title}
                </h3>

                <p className="mt-1 text-slate-600">
                  {application.job?.company}
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>
                    Status:{" "}
                    <span className="font-semibold text-teal-600">
                      {application.status}
                    </span>
                  </p>

                  <p>
                    Priority:{" "}
                    <span className="font-semibold">
                      {application.priority}
                    </span>
                  </p>

                  {application.appliedAt && (
                    <p>
                      Applied:{" "}
                      {new Date(
                        application.appliedAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Applications;