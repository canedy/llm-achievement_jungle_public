/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ObjectiveType" AS ENUM ('Company', 'Development', 'Training', 'Networking', 'Personal');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NotStarted', 'InProgress', 'Complete');

-- DropTable
DROP TABLE "Country";

-- CreateTable
CREATE TABLE "objectives" (
    "goal_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "ObjectiveType" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("goal_id")
);

-- CreateTable
CREATE TABLE "goals" (
    "result_id" SERIAL NOT NULL,
    "goal_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "actions" (
    "action_id" SERIAL NOT NULL,
    "result_id" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT,
    "status" "Status" NOT NULL,
    "date_achieved" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("action_id")
);

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "objectives"("goal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "goals"("result_id") ON DELETE SET NULL ON UPDATE CASCADE;
