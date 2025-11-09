'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/books?query=${encodeURIComponent(trimmed)}` : '/books');
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3 mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300"
      >
        Search
      </button>
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            router.push("/books");
          }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold transition-all duration-300 flex items-center gap-2 border border-gray-600"
          aria-label="Reset search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      )}
    </form>
  );
}
