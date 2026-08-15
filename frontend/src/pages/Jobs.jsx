import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobUnavailable from "../components/JobUnavailable";
import JobCard from "../components/JobCard";
import { getAllLiveJobs } from "../services/jobService";

// const mockJobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "Tech Solutions",
//     location: "Bangalore",
//     type: "Full Time",
//     experience: "0-2 years",
//     salary: "₹6L - ₹10L",
//     source: "Jooble",
//     posted: "2 days ago",
//     skills: ["React", "JavaScript", "Tailwind CSS"],
//   },
//   {
//     id: 2,
//     title: "React Developer",
//     company: "Innovate Labs",
//     location: "Hyderabad",
//     type: "Full Time",
//     experience: "1-3 years",
//     salary: "₹7L - ₹12L",
//     source: "Adzuna",
//     posted: "1 day ago",
//     skills: ["React", "Node.js", "MongoDB"],
//   },
//   {
//     id: 3,
//     title: "Full Stack Developer",
//     company: "Startup Hub",
//     location: "Remote",
//     type: "Full Time",
//     experience: "2-4 years",
//     salary: "₹10L - ₹18L",
//     source: "Jooble",
//     posted: "3 days ago",
//     skills: ["React", "Node.js", "Express", "MongoDB"],
//   },
//   {
//     id: 4,
//     title: "Software Engineer",
//     company: "Digital Works",
//     location: "Pune",
//     type: "Full Time",
//     experience: "0-2 years",
//     salary: "₹5L - ₹9L",
//     source: "Adzuna",
//     posted: "5 days ago",
//     skills: ["JavaScript", "React", "Git"],
//   },
// ];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("keyword") || "React");
  const [location, setLocation] = useState(
    searchParams.get("location") || "India",
  );
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const page = Number(searchParams.get("page")) || 1;

  //getting all jobs based on keywords and location
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllLiveJobs({
          keyword: searchParams.get("keyword") || "React",
          location: searchParams.get("location") || "India",
          page: page,
        });
        setJobs(response.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Unable to fetch jobs. Please try again.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchParams]);

  //handle search for url update as per the search query and location
  const handleSearch = () => {
    setSearchParams({
      keyword: search,
      location: location,
      page: 1,
    });
  };

  //frontend filtering based on job type and experience

  const filteredJobs = jobs.filter((job) => {
    const matchesJobType = !jobType || job.type === jobType;

    const matchesExperience = !experience || job.experience === experience;

    return matchesJobType && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <p className="text-teal-600 font-semibold mb-2">
              FIND YOUR NEXT OPPORTUNITY
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Find jobs that match your skills
            </h1>

            <p className="mt-4 text-lg text-slate-500">
              Search jobs from multiple platforms and keep track of applications
              directly from TrackHire.
            </p>
          </div>
        </div>
      </section>
      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-6 -mt-6 relative">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="React Developer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="Bangalore..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Type
              </label>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Experience
              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Any Experience</option>
                <option value="0-2 years">0-2 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="2-4 years">2-4 years</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mx-auto my-10 justify-center flex px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
          >
            Search Jobs
          </button>
        </div>
      </section>
      {/* Jobs */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Available Jobs
            </h2>

            <p className="text-slate-500 mt-1">
              {filteredJobs.length} jobs found
            </p>
          </div>
        </div>

        {/* Job Cards */}

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <JobUnavailable />
        )}
      </section>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1 || loading}
          onClick={() => {
            setSearchParams({
              keyword: searchParams.get("keyword") || "",
              location: searchParams.get("location") || "",
              page: page - 1,
            });
          }}
          className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="font-semibold text-slate-700">Page {page}</span>

        <button
          disabled={loading || jobs.length < 10}
          onClick={() => {
            setSearchParams({
              keyword: searchParams.get("keyword") || "",
              location: searchParams.get("location") || "",
              page: page + 1,
            });
          }}
          className="px-5 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Jobs;
