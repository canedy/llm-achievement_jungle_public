/*
  Warnings:

  - The primary key for the `goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `goal_id` on the `goals` table. All the data in the column will be lost.
  - The primary key for the `results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `result_id` on the `results` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "actions" DROP CONSTRAINT "actions_result_id_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_goal_id_fkey";

-- AlterTable
ALTER TABLE "goals" DROP CONSTRAINT "goals_pkey",
DROP COLUMN "goal_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "results" DROP CONSTRAINT "results_pkey",
DROP COLUMN "result_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "results_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE SET NULL ON UPDATE CASCADE;
