/*
  Warnings:

  - The primary key for the `goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `due_date` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `result_id` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the `objectives` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_date` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "actions" DROP CONSTRAINT "actions_result_id_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_goal_id_fkey";

-- AlterTable
CREATE SEQUENCE goals_goal_id_seq;
ALTER TABLE "goals" DROP CONSTRAINT "goals_pkey",
DROP COLUMN "due_date",
DROP COLUMN "result_id",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" "ObjectiveType" NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "goal_id" SET DEFAULT nextval('goals_goal_id_seq'),
ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("goal_id");
ALTER SEQUENCE goals_goal_id_seq OWNED BY "goals"."goal_id";

-- DropTable
DROP TABLE "objectives";

-- CreateTable
CREATE TABLE "results" (
    "result_id" SERIAL NOT NULL,
    "goal_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("result_id")
);

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("goal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("result_id") ON DELETE SET NULL ON UPDATE CASCADE;
