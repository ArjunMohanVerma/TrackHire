import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechNova",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹12L - ₹20L",
    description:
      "Build scalable applications and work with a modern engineering team.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "InnovateLabs",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹10L - ₹18L",
    description:
      "Build responsive and user-friendly interfaces using modern frontend technologies.",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "CloudWorks",
    location: "Pune",
    type: "Full Time",
    salary: "₹12L - ₹22L",
    description:
      "Design APIs and backend services for high-scale applications.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="bg-linear-to-br from-teal-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
                🚀 Your job search, organized
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Track your applications.
                <span className="text-teal-600">
                  {" "}Find your next opportunity.
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                TrackHire helps you organize job applications, discover new
                opportunities, and keep track of every step in your job search.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                >
                  Get Started
                </Link>

                <a
                  href="#jobs"
                  className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-white transition"
                >
                  Explore Jobs
                </a>

              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Your Job Search
                  </p>

                  <h2 className="text-xl font-bold text-slate-900">
                    Overview
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  📊
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Applications
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    24
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Interviews
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    5
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Offers
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    2
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Response Rate
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    21%
                  </p>
                </div>

              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">
                    Application progress
                  </span>

                  <span className="font-semibold text-teal-600">
                    68%
                  </span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-teal-500 rounded-full" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal-600 font-semibold">
              WHY TRACKHIRE?
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Everything you need for your job search
            </h2>

            <p className="mt-4 text-slate-600">
              Stop managing applications across spreadsheets, bookmarks,
              emails, and notes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                📋
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Track Applications
              </h3>

              <p className="mt-3 text-slate-600">
                Keep every application organized and know exactly where you
                stand with each company.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Discover Jobs
              </h3>

              <p className="mt-3 text-slate-600">
                Explore available opportunities and quickly find jobs that
                match what you're looking for.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                📈
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Measure Progress
              </h3>

              <p className="mt-3 text-slate-600">
                Understand your job search with application statistics,
                interviews, offers, and response rates.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-20 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

            <div>
              <p className="text-teal-600 font-semibold">
                OPPORTUNITIES
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                Available Jobs
              </h2>

              <p className="mt-3 text-slate-600">
                Find your next opportunity and take the next step in your
                career.
              </p>
            </div>

            <Link
              to="/jobs"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              View all jobs →
            </Link>

          </div>

          {/* Job Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mt-10">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-teal-600 font-medium">
                      {job.company}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center">
                    💼
                  </div>

                </div>

                <div className="flex flex-wrap gap-2 mt-5">

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                    📍 {job.location}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                    {job.type}
                  </span>

                </div>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {job.description}
                </p>

                <p className="mt-4 font-semibold text-slate-900">
                  {job.salary}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                  >
                    View Job
                  </button>

                  <Link
                    to="/signup"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                  >
                    Apply Now
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to take control of your job search?
          </h2>

          <p className="mt-4 text-teal-50 text-lg">
            Create your free TrackHire account and start organizing your
            applications today.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 px-7 py-3 rounded-lg bg-white text-teal-700 font-bold hover:bg-teal-50 transition"
          >
            Create Free Account
          </Link>

        </div>

      </section>

      {/* Footer */}
      {/* <footer className="bg-slate-900 py-8">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div>
              <p className="text-white font-bold text-lg">
                TrackHire
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Organize your job search. Find your next opportunity.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/login" className="hover:text-white">
                Login
              </Link>

              <Link to="/signup" className="hover:text-white">
                Sign Up
              </Link>

              <a href="#jobs" className="hover:text-white">
                Jobs
              </a>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-6 pt-6 text-center text-sm text-slate-500">
            © 2026 TrackHire. All rights reserved.
          </div>

        </div>

      </footer> */}

    </div>
  );
};

export default Home;