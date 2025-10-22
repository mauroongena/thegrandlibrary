-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'GUEST'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
