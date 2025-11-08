import { LoanForm } from "@/app/components/LoanForm";
import { PrismaClient } from "@/app/_generated/prisma";

const prisma = new PrismaClient();

export default async function LoansAdminPage() {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { email: "asc" },
  });

  const books = await prisma.book.findMany({
    orderBy: { title: "asc" },
  });

  const loans = await prisma.loan.findMany({
    include: {
      user: true,
      book: true,
    },
    orderBy: { loanedAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-semibold">Loan out books</h1>

      <LoanForm users={users} books={books} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing loans</h2>

        {loans.length === 0 && (
          <p className="text-gray-500">No loans yet.</p>
        )}

        {loans.map((loan) => (
          <div
            key={loan.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>
              <strong>{loan.book.title}</strong> → {loan.user.email} → Due: {loan.dueAt ? new Date(loan.dueAt).toLocaleDateString() : "N/A"}
            </span>

            <span className="text-sm text-gray-600">
              {new Date(loan.loanedAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
