/*
  Warnings:

  - The primary key for the `Selection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `selectionId` was added to the `Selection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Selection" DROP CONSTRAINT "Selection_pkey",
ADD COLUMN     "selectionId" TEXT NOT NULL,
ADD CONSTRAINT "Selection_pkey" PRIMARY KEY ("selectionId");
