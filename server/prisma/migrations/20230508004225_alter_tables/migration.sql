/*
  Warnings:

  - Added the required column `password` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "type" CHAR(1) NOT NULL DEFAULT 'J';
