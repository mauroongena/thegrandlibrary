import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-center">
            About
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">About Me</h2>
            <p className="text-gray-300 text-lg mb-4">
                Mauro Ongena is a 21-year-old full-stack web enthusiast with a strong interest in building complete digital experiences. He enjoys working across both frontend and backend, bringing ideas to life through clean, functional, and user-focused development.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">About This Project</h2>
            <p className="text-gray-300 text-lg">
              The Grand Library is a modern web application built with Next.js, Prisma, and Radix UI. It allows users to browse, search, and manage a curated collection of books. Features include authentication, wishlist, ratings, and admin controls for adding, editing, and removing books. The project demonstrates full-stack development, database modeling, and a beautiful, responsive UI using Tailwind CSS and Radix themes.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/books" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
