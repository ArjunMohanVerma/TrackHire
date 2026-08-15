import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-75">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-slate-500 font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loading;