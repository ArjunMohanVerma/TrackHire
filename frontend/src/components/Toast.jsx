import React, { useEffect } from "react";

const Toast = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 right-6 z-100 animate-slide-in">
      <div
        className={`min-w-[320px] max-w-md rounded-xl border shadow-xl p-4 flex items-start gap-3 bg-white ${
          isSuccess
            ? "border-emerald-200"
            : "border-red-200"
        }`}
      >
        {/* Icon */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            isSuccess
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="font-semibold text-slate-900">
            {isSuccess ? "Success" : "Something went wrong"}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            {message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;