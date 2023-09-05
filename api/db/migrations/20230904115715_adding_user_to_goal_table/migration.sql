/*
  Warnings:

  - The values [Company,Development,Training,Networking] on the enum `ObjectiveType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `result_id` on table `actions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ObjectiveType_new" AS ENUM ('Personal', 'Professional', 'Physical', 'Mental_Health', 'Financial', 'relationships', 'Spiritual', 'Social', 'Other');
ALTER TABLE "goals" ALTER COLUMN "type" TYPE "ObjectiveType_new" USING ("type"::text::"ObjectiveType_new");
ALTER TYPE "ObjectiveType" RENAME TO "ObjectiveType_old";
ALTER TYPE "ObjectiveType_new" RENAME TO "ObjectiveType";
DROP TYPE "ObjectiveType_old";
COMMIT;

-- AlterTable
ALTER TABLE "actions" ALTER COLUMN "result_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "user" TEXT;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
