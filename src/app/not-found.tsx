import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-xl w-full bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-10 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Page not found
        </h1>
        <p className="text-gray-400 mb-6">
          We could not find what you were looking for — it may have been moved or deleted.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-200"
          >
            Home
          </Link>

          <Link
            href="/books"
            className="px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white border border-gray-600 transition-all duration-200"
          >
            Browse books
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">If you think this is an error, check the URL or return to the home page.</p>
      </div>
    </div>
  );
}
