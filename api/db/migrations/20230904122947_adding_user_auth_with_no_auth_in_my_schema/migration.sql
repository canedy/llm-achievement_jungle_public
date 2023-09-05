/*
  Warnings:

  - You are about to drop the column `user` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_user_fkey";

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "user",
ADD COLUMN     "auth_user" TEXT;

-- DropTable
DROP TABLE "users";
