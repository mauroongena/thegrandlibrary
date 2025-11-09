export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      <div className="h-10 w-48 bg-gray-700/50 rounded-lg animate-pulse mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-700 bg-gray-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4 shadow-md"
          >
            <div className="shrink-0">
              <div className="w-24 h-32 bg-gray-700/50 rounded-md animate-pulse"></div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-1">
              <div className="h-6 w-full bg-gray-700/50 rounded animate-pulse mb-2"></div>
              
              <div className="flex gap-2 items-center">
                <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
              
              <div className="flex gap-2 items-center">
                <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
              
              <div className="flex gap-2 items-center">
                <div className="h-4 w-12 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}