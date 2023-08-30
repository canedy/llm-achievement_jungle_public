/*
  Warnings:

  - You are about to drop the column `name` on the `actions` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `actions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actions" DROP COLUMN "name",
DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;
