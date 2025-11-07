"use client";

import { useState } from "react";

export default function StarRating({ initialValue, bookId }: { initialValue: number; bookId: number }) {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  const rate = async (value: number) => {
    setRating(value);
    await fetch("/api/ratings", {
      method: "POST",
      body: JSON.stringify({ bookId, value }),
    });
  };

  return (
    <div className="flex gap-1 text-yellow-400 text-2xl">
      {[1,2,3,4,5].map((star) => (
        <button
          key={star}
          className="cursor-pointer"
          onClick={() => rate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          {star <= (hover || rating) ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
