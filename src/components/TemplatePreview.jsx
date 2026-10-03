const TemplatePreview = ({ type }) => {
  return (
    <div className="h-[220px] bg-gray-100 p-4 overflow-hidden">
      {type === "ats" && (
        <div className="h-full bg-white shadow-sm p-4">
          <div className="h-3 bg-gray-800 rounded w-1/2 mb-2" />

          <div className="h-2 bg-gray-300 rounded w-1/3 mb-5" />

          <div className="border-t mb-4" />

          <div className="h-2 bg-gray-700 rounded w-1/4 mb-3" />

          <div className="space-y-2">
            <div className="h-1.5 bg-gray-300 rounded w-full" />
            <div className="h-1.5 bg-gray-300 rounded w-11/12" />
            <div className="h-1.5 bg-gray-300 rounded w-10/12" />
          </div>

          <div className="h-2 bg-gray-700 rounded w-1/4 mt-5 mb-3" />

          <div className="space-y-2">
            <div className="h-1.5 bg-gray-300 rounded w-full" />
            <div className="h-1.5 bg-gray-300 rounded w-10/12" />
          </div>
        </div>
      )}

      {type === "modern" && (
        <div className="h-full bg-white shadow-sm flex">
          <div className="w-[32%] bg-blue-700 p-3">
            <div className="w-10 h-10 bg-white/30 rounded-full mb-4" />

            <div className="h-2 bg-white rounded w-full mb-2" />

            <div className="h-1.5 bg-white/50 rounded w-4/5 mb-5" />

            <div className="space-y-2">
              <div className="h-1 bg-white/40 rounded" />
              <div className="h-1 bg-white/40 rounded" />
              <div className="h-1 bg-white/40 rounded" />
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="h-3 bg-gray-800 rounded w-2/3 mb-2" />

            <div className="h-1.5 bg-blue-500 rounded w-1/3 mb-5" />

            <div className="space-y-2">
              <div className="h-1.5 bg-gray-300 rounded w-full" />
              <div className="h-1.5 bg-gray-300 rounded w-11/12" />
              <div className="h-1.5 bg-gray-300 rounded w-4/5" />
            </div>

            <div className="h-2 bg-gray-700 rounded w-1/3 mt-5 mb-3" />

            <div className="space-y-2">
              <div className="h-1.5 bg-gray-300 rounded" />
              <div className="h-1.5 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        </div>
      )}

      {type === "professional" && (
        <div className="h-full bg-white shadow-sm">
          <div className="bg-slate-800 p-4">
            <div className="h-3 bg-white rounded w-1/2 mb-2" />

            <div className="h-1.5 bg-gray-400 rounded w-1/3" />
          </div>

          <div className="p-4 grid grid-cols-[65%_35%] gap-3">
            <div>
              <div className="h-2 bg-slate-700 rounded w-1/3 mb-3" />

              <div className="space-y-2">
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded w-4/5" />
              </div>

              <div className="h-2 bg-slate-700 rounded w-1/3 mt-5 mb-3" />

              <div className="space-y-2">
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded w-5/6" />
              </div>
            </div>

            <div className="border-l pl-3">
              <div className="h-2 bg-slate-700 rounded w-2/3 mb-3" />

              <div className="space-y-2">
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded" />
                <div className="h-1.5 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;