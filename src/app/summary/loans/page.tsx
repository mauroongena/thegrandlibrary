import { PrismaClient } from "@/app/_generated/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ExtendLoanButton from "@/app/components/ExtendLoanButton";
import Image from "next/image";

const prisma = new PrismaClient();

function formatTimeUntil(date: Date) {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  if (diffDays === 0) return "today";
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
}

export default async function MyLoansPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!session || !user) redirect("/");

  const loans = await prisma.loan.findMany({
    where: { userId: user.id, returnedAt: null },
    include: { book: true },
    orderBy: { dueAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-8">
          My Loans
        </h1>

        {loans.length === 0 ? (
          <p className="text-gray-400 text-lg">You have no active loans.</p>
        ) : (
          <div className="space-y-6">
            {loans.map((loan) => {
              const overdue =
                loan.dueAt && new Date(loan.dueAt).getTime() < Date.now();
              const dueIn = loan.dueAt
                ? formatTimeUntil(new Date(loan.dueAt))
                : "No due date";

              const dueAt = loan.dueAt
                ? new Date(loan.dueAt).toLocaleDateString("en-GB")
                : "N/A";

              return (
                <div
                  key={loan.id}
                  className={`rounded-xl border p-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1 ${
                    overdue
                      ? "border-red-500/50 bg-red-500/10"
                      : "border-gray-700 bg-gray-800/40 hover:border-blue-500/40"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-5">
                      {loan.book.image ? (
                        <div className="w-20 h-28 rounded-lg overflow-hidden border border-gray-700">
                          <Image
                            src={loan.book.image}
                            alt={loan.book.title}
                            width={80}
                            height={110}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-28 flex items-center justify-center text-sm text-gray-500 bg-gray-700 rounded-lg">
                          No Image
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl font-semibold text-blue-400">
                          {loan.book.title}
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                          Due {dueIn}
                          {overdue && (
                            <span className="ml-2 text-red-500 font-semibold">
                              • Overdue
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-sm">
                      <p className="text-gray-300">{dueAt}</p>

                      {!overdue && !loan.extendedOnce && (
                        <div className="mt-2">
                          <ExtendLoanButton loanId={loan.id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
