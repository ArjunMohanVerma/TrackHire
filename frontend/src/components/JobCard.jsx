import React from 'react'

const JobCard = ({job}) => {
  return (
    <>
    
    <div
                
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition duration-200"
              >

                {/* Top */}
                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-slate-600 font-medium">
                      {job.company}
                    </p>

                  </div>

                  <span className="text-xs font-semibold px-3 py-1 h-fit rounded-full bg-teal-50 text-teal-700">
                    {job.source}
                  </span>

                </div>


                {/* Job Info */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-sm text-slate-500">

                  <span>
                    📍 {job.location}
                  </span>

                  <span>
                    💼 {job.type}
                  </span>

                  <span>
                    🎓 {job.experience}
                  </span>

                </div>


                {/* Salary */}
                <div className="mt-4">

                  <span className="font-semibold text-slate-800">
                    {job.salary}
                  </span>

                  <span className="text-sm text-slate-400 ml-3">
                    • {job.posted}
                  </span>

                </div>


                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-5">

                  {(job.skills || []).map((skill) => (

                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>


                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  <button
                    className="flex-1 px-5 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                  >
                    View Details
                  </button>

                  <button
                    className="flex-1 px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
                  >
                    Apply & Track
                  </button>

                </div>

              </div>
    
    </>
  )
}

export default JobCard