-- DropForeignKey
ALTER TABLE "TrainingFile" DROP CONSTRAINT "TrainingFile_trainingId_fkey";

-- AddForeignKey
ALTER TABLE "TrainingFile" ADD CONSTRAINT "TrainingFile_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "PersonalTraining"("id") ON DELETE CASCADE ON UPDATE CASCADE;
