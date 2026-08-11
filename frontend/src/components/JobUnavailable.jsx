import React from 'react'

const JobUnavailable = () => {
  return (
    <>
    
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No jobs found
            </h3>

            <p className="mt-2 text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
    
    </>
  )
}

export default JobUnavailable