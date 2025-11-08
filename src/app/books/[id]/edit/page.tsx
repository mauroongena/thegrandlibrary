"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Image from "next/image";

interface EditBookProps {
  params: Promise<{ id: string }>;
}

interface BookGenre {
  genreId: number;
  genre: { title: string };
}

interface BookAuthor {
  authorId: number;
  author: { title: string };
}

interface BookData {
  id: number;
  title: string;
  image?: string;
  publisher?: string;
  pages?: number;
  year?: number;
  description?: string;
  genres: BookGenre[];
  author: BookAuthor[];
}

interface Author {
  id: number;
  title: string;
}

interface Genre {
  id: number;
  title: string;
}

export default function EditBookPage({ params }: EditBookProps) {
  const router = useRouter();
  const { id } = use(params);

  const [book, setBook] = useState<BookData | null>(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [description, setDescription] = useState("");

  const [authorIds, setAuthorIds] = useState<number[]>([]);
  const [genreIds, setGenreIds] = useState<number[]>([]);

  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [bookRes, authorsRes, genresRes] = await Promise.all([
        fetch(`/api/book?id=${id}`),
        fetch("/api/authors"),
        fetch("/api/genres"),
      ]);
      const bookData = await bookRes.json();
      const authorsData = await authorsRes.json();
      const genresData = await genresRes.json();

      setBook(bookData.book);
      setTitle(bookData.book.title);
      setImage(bookData.book.image || "");
      setPublisher(bookData.book.publisher || "");
      setPages(bookData.book.pages);
      setYear(bookData.book.year);
      setDescription(bookData.book.description || "");
      setAuthorIds(bookData.book.author.map((a: BookAuthor) => a.authorId));
      setGenreIds(bookData.book.genres.map((g: BookGenre) => g.genreId));

      setAllAuthors(authorsData.authors);
      setAllGenres(genresData.genres);
    }

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          publisher,
          pages,
          year,
          description,
          authorIds,
          genreIds,
        }),
      });

      if (res.ok) {
        router.push(`/books/${id}`);
      } else {
        let errorMsg = "Failed to update book";
        try {
          const data = await res.json();
          if (data?.error) errorMsg = data.error;
        } catch {}
        alert(errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <p>Loading...</p>;

  const addAuthor = (authorId: number) => {
    if (!authorIds.includes(authorId)) setAuthorIds([...authorIds, authorId]);
  };
  const removeAuthor = (authorId: number) => {
    setAuthorIds(authorIds.filter((id) => id !== authorId));
  };

  const addGenre = (genreId: number) => {
    if (!genreIds.includes(genreId)) setGenreIds([...genreIds, genreId]);
  };
  const removeGenre = (genreId: number) => {
    setGenreIds(genreIds.filter((id) => id !== genreId));
  };
  const isAllowedImage = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname === "cdn.standaardboekhandel.be";
  } catch {
    return false;
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Edit Book
          </h1>
          <div className="space-y-4 max-w-lg">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Image preview</label>
          {image && isAllowedImage(image) ? (
            <Image
              src={image}
              alt={title}
              width={150}
              height={200}
              className="w-36 h-48 object-cover rounded"
            />
          ) : (
            <div className="w-36 h-48 bg-gray-700 flex items-center justify-center rounded">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Publisher</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Pages</label>
          <input
            type="number"
            value={pages ?? ""}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Year</label>
          <input
            type="number"
            value={year ?? ""}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-gray-300 mb-2">Authors</h2>
          <table className="w-full border border-gray-700 rounded mb-2">
            <tbody>
              {authorIds.map((id) => {
                const author = allAuthors.find((a) => a.id === id);
                if (!author) return null;
                return (
                  <tr key={id} className="border-b border-gray-700">
                    <td className="p-2">{author.title}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => removeAuthor(id)}
                        className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <select
            onChange={(e) => addAuthor(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Add author
            </option>
            {allAuthors
              .filter((a) => !authorIds.includes(a.id))
              .map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-gray-300 mb-2">Genres</h2>
          <table className="w-full border border-gray-700 rounded mb-2">
            <tbody>
              {genreIds.map((id) => {
                const genre = allGenres.find((g) => g.id === id);
                if (!genre) return null;
                return (
                  <tr key={id} className="border-b border-gray-700">
                    <td className="p-2">{genre.title}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => removeGenre(id)}
                        className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <select
            onChange={(e) => addGenre(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Add genre
            </option>
            {allGenres
              .filter((g) => !genreIds.includes(g.id))
              .map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
          </select>
        </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Book"}
            </button>

            <button
              onClick={() => router.push(`/books/${id}`)}
              type="button"
              className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl border border-gray-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}