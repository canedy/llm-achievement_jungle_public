-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_goal_id_fkey";

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
