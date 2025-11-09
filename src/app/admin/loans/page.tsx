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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Loan Out Books
          </h1>
          <p className="text-gray-400 text-lg">
            Manage active book loans
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <LoanForm users={users} books={books} />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-400">Existing Loans</h2>

          {loans.length === 0 && (
            <p className="text-gray-500 text-lg">No loans yet.</p>
          )}

          <div className="space-y-4">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="bg-gray-800/40 border border-gray-700 rounded-xl p-5 flex justify-between items-center shadow-lg hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-gray-300">
                  <span className="font-semibold text-blue-400">
                    {loan.book.title}
                  </span>{" "}
                  → {loan.user.email} →{" "}
                  <span className="text-gray-400">
                    Due:{" "}
                    {loan.dueAt
                      ? new Date(loan.dueAt).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  {new Date(loan.loanedAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
