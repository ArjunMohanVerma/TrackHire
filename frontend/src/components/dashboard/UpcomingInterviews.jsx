
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const UpcomingInterviews = ({ interviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const upcomingInterviews = [...interviews]
    .filter((interview) => {
      if (!interview.interviewDate) return false;

      const date = new Date(interview.interviewDate);

      return !Number.isNaN(date.getTime()) && date >= new Date();
    })
    .sort(
      (a, b) =>
        new Date(a.interviewDate) - new Date(b.interviewDate)
    );

  const total = upcomingInterviews.length;

  // Keep the index valid if the API data changes.
  const safeIndex = Math.min(currentIndex, Math.max(0, total - 1));

  const interview = upcomingInterviews[safeIndex];

  const handlePrevious = () => {
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(total - 1, index + 1));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Interviews
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Stay prepared for your next opportunity.
          </p>
        </div>

        {total > 0 && (
          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {safeIndex + 1} of {total}
          </span>
        )}
      </div>

      {total === 0 ? (
        <div className="py-8 text-center">
          <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-300" />

          <p className="font-medium text-slate-700">
            No upcoming interviews
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled interviews will appear here.
          </p>
        </div>
      ) : (
        <>
          <div
            key={interview._id}
            className="min-h-48 rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-50 p-2.5">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words font-semibold text-slate-800">
                  {interview.job?.title ||
                    interview.company ||
                    "Interview"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {interview.job?.company ||
                    interview.company ||
                    "Company not specified"}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    {formatDate(interview.interviewDate)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" />
                    {formatTime(interview.interviewDate)}
                  </span>

                  {interview.job?.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {interview.job.location}
                    </span>
                  )}
                </div>

                {interview.status && (
                  <span className="mt-4 inline-block rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                    {interview.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">
              Interview {safeIndex + 1} of {total}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={safeIndex === 0}
                aria-label="Previous interview"
                className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={safeIndex === total - 1}
                aria-label="Next interview"
                className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingInterviews;



// import { CalendarDays, Clock, MapPin } from "lucide-react";

// const UpcomingInterviews = ({ interviews = [] }) => {
//   const upcomingInterviews = [...interviews]
//     .filter((interview) => {
//       if (!interview.interviewDate) return false;

//       return new Date(interview.interviewDate) >= new Date();
//     })
//     .sort(
//       (a, b) =>
//         new Date(a.interviewDate) - new Date(b.interviewDate)
//     )
//     .slice(0, 5);

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//   const formatTime = (date) =>
//     new Date(date).toLocaleTimeString("en-IN", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-slate-900">
//           Upcoming Interviews
//         </h2>
//         <p className="mt-1 text-sm text-slate-500">
//           Stay prepared for your next opportunity.
//         </p>
//       </div>

//       {upcomingInterviews.length === 0 ? (
//         <div className="py-8 text-center">
//           <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-300" />

//           <p className="font-medium text-slate-700">
//             No upcoming interviews
//           </p>

//           <p className="mt-1 text-sm text-slate-500">
//             Your scheduled interviews will appear here.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {upcomingInterviews.map((interview) => {
//             const job = interview.job || {};

//             return (
//               <div
//                 key={interview._id}
//                 className="rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="rounded-lg bg-blue-50 p-2.5">
//                     <CalendarDays className="h-5 w-5 text-blue-600" />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <h3 className="truncate font-semibold text-slate-800">
//                       {job.title || interview.company || "Interview"}
//                     </h3>

//                     <p className="mt-1 text-sm text-slate-500">
//                       {job.company || interview.company || "Company not specified"}
//                     </p>

//                     <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
//                       <span className="flex items-center gap-1.5">
//                         <CalendarDays className="h-4 w-4" />
//                         {formatDate(interview.interviewDate)}
//                       </span>

//                       <span className="flex items-center gap-1.5">
//                         <Clock className="h-4 w-4" />
//                         {formatTime(interview.interviewDate)}
//                       </span>

//                       {job.location && (
//                         <span className="flex items-center gap-1.5">
//                           <MapPin className="h-4 w-4" />
//                           {job.location}
//                         </span>
//                       )}
//                     </div>

//                     {interview.status && (
//                       <span className="mt-3 inline-block rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
//                         {interview.status}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpcomingInterviews;