-- DropForeignKey
ALTER TABLE "actions" DROP CONSTRAINT "actions_result_id_fkey";

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;
