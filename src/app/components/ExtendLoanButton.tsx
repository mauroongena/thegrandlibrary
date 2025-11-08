"use client";

import { useTransition } from "react";
import { extendLoan } from "../api/summary/route";

export default function ExtendLoanButton({ loanId }: { loanId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await extendLoan(loanId);
          window.location.reload();
        })
      }
      disabled={isPending}
      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
    >
      {isPending ? "Extending..." : "Extend Loan"}
    </button>
  );
}
