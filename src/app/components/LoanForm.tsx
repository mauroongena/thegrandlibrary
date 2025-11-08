"use client";

import React, { useState } from "react";

export interface LoanFormProps {
  users: { id: string; email: string }[];
  books: { id: number; title: string }[];
}

export function LoanForm({ users, books }: LoanFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const userId = form.userId.value;
    const bookId = parseInt(form.bookId.value, 10);
    const dueAtInput = form.dueAt.value;

    let dueAt: Date | null = null;
    if (dueAtInput) {
      const parsed = new Date(dueAtInput);
      if (isNaN(parsed.getTime())) {
        alert("Invalid Due Date");
        setLoading(false);
        return;
      }
      dueAt = parsed;
    }

    const res = await fetch("/api/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, bookId, dueAt }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block mb-1">User</label>
        <select name="userId" required className="border p-2 w-full">
          <option value="">Select a user</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.email}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Book</label>
        <select name="bookId" required className="border p-2 w-full">
          <option value="">Select a book</option>
          {books.map(b => (
            <option key={b.id} value={b.id}>{b.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Due At</label>
        <input type="date" name="dueAt" className="border p-2 w-full" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 border rounded bg-blue-500 text-white"
      >
        {loading ? "Creating…" : "Loan Book"}
      </button>
    </form>
  );
}
