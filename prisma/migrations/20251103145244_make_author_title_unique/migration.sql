/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Author_title_key" ON "Author"("title");
