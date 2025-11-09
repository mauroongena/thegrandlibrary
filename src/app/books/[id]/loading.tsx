export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-blue-400 mb-8">
          <div className="w-4 h-4 bg-gray-700/50 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse"></div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="h-12 w-3/4 mx-auto bg-gray-700/50 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 w-1/2 mx-auto bg-gray-700/50 rounded-lg animate-pulse mb-2"></div>
            <div className="h-8 w-32 mx-auto bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-8 flex items-center justify-center min-h-[300px] animate-pulse">
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-28 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-40 bg-gray-700/50 rounded animate-pulse"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-36 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-700/50 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-700/50 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-700">
            <div className="w-full sm:w-auto">
              <div className="h-12 w-40 bg-gray-700/50 rounded-xl animate-pulse"></div>
            </div>
            <div className="w-full sm:w-auto flex justify-start sm:justify-end items-center gap-4">
              <div className="h-12 w-40 bg-gray-700/50 rounded-xl animate-pulse"></div>
              <div className="h-12 w-40 bg-gray-700/50 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}