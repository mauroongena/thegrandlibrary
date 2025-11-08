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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Loans</h1>

      {loans.length === 0 ? (
        <p className="text-gray-500">You have no active loans.</p>
      ) : (
        <div className="space-y-4">
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
                className={`border rounded-xl p-4 shadow-sm ${
                  overdue ? "border-red-500" : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {loan.book.image ? (
                      <Image
                        src={loan.book.image}
                        alt={loan.book.title}
                        width={80}
                        height={120}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-30 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                        no image
                      </div>
                    )}

                    <div>
                      <h2 className="text-lg font-medium">{loan.book.title}</h2>
                      <p className="text-sm text-gray-500">
                        Due {dueIn}
                        {overdue && (
                          <span className="ml-2 text-red-600 font-semibold">
                            ⚠️ Overdue – please return!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p>{dueAt}</p>
                    {!overdue && !loan.extendedOnce && (
                      <ExtendLoanButton loanId={loan.id} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
