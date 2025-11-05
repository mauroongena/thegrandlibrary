"use client";
import { useState } from "react";

interface AddToWishlistButtonProps {
  bookId: number;
  userEmail: string;
  initiallyAdded?: boolean;
}

export default function AddToWishlistButton({ bookId, userEmail, initiallyAdded = false }: AddToWishlistButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(initiallyAdded);

  async function handleAdd() {
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, userEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setAdded(true);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading || added}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        added
          ? "bg-green-600 text-white"
          : "bg-pink-600 hover:bg-pink-700 text-white hover:shadow-lg hover:shadow-pink-500/25"
      }`}
    >
      {added ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Wishlist
        </>
      ) : loading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 12a8 8 0 018-8" />
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L20 7" />
          </svg>
          Add to Wishlist
        </>
      )}
    </button>
  );
}
