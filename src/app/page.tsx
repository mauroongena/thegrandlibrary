import CountUp from "./animations/CountUp";
import prisma from "@/lib/client";
import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";

interface SearchParams {
  searchParams?: { query?: string };
}

export default async function Home() {
  const totalBooks = await prisma.book.count();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
            Welcome to Your Library
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover, organize, and explore your personal book collection in one beautiful space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/30">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <svg 
                  className="w-10 h-10 text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>

              <div className="mb-4">
                <CountUp
                  from={0}
                  to={totalBooks}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                Books in Collection
              </h2>
              <p className="text-gray-400 text-lg">
                and growing...
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Explore?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Dive into your curated collection, discover new reads, and manage your literary journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/books"
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                </svg>
                View All Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}