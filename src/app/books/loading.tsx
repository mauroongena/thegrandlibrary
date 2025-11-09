export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="h-10 w-64 bg-gray-700/50 rounded-lg animate-pulse mb-2"></div>
            <div className="h-6 w-48 bg-gray-700/50 rounded-lg animate-pulse"></div>
          </div>
          <div className="hidden md:block h-12 w-36 bg-gray-700/50 rounded-xl animate-pulse"></div>
        </div>

        <div className="h-12 w-full bg-gray-700/50 rounded-xl animate-pulse mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
            >
              <div className="w-full h-[200px] bg-gray-700/30 rounded-xl mb-4 animate-pulse"></div>
              
              <div className="h-7 w-3/4 bg-gray-700/50 rounded-lg animate-pulse mb-3"></div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}