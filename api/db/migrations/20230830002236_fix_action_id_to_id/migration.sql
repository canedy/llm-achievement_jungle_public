/*
  Warnings:

  - The primary key for the `actions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `action_id` on the `actions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actions" DROP CONSTRAINT "actions_pkey",
DROP COLUMN "action_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "actions_pkey" PRIMARY KEY ("id");
