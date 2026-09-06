const  ApplicationDeleteModal = ({deletingApplication, setDeletingApplication,onConfirmDelete})=> {


    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Delete Application?
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Are you sure you want to delete this application?
                </p>
              </div>

              <button
                onClick={() => setDeletingApplication(null)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                {deletingApplication.job?.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {deletingApplication.job?.company}
              </p>
            </div>

            <p className="mt-4 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingApplication(null)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() =>  onConfirmDelete(deletingApplication._id)}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                Delete Application
              </button>
            </div>
          </div>
        </div>
        </>
    )
}

export default ApplicationDeleteModal;