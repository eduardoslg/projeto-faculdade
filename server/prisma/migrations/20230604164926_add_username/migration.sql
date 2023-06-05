/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_username_key" ON "pessoa"("username");
