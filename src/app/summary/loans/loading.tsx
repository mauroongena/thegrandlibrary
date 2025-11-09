export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 w-32 bg-gray-700/50 rounded-lg animate-pulse mb-4"></div>

        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-30 bg-gray-700/50 rounded animate-pulse"></div>

                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-8 w-28 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}