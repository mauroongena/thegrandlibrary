"use server";

import { PrismaClient } from "@/app/_generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function extendLoan(loanId: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const loan = await prisma.loan.findUnique({ where: { id: loanId } });
  if (!loan) throw new Error("Loan not found");
  if (loan.extendedOnce) throw new Error("Already extended once");

  const newDueAt = new Date(loan.dueAt ?? new Date());
  newDueAt.setDate(newDueAt.getDate() + 7);

  await prisma.loan.update({
    where: { id: loanId },
    data: { dueAt: newDueAt, extendedOnce: true },
  });
}
