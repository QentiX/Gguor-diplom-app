-- CreateTable
CREATE TABLE "PersonalTraining" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "recommendations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "PersonalTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingFile" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "TrainingFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalTraining" ADD CONSTRAINT "PersonalTraining_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTraining" ADD CONSTRAINT "PersonalTraining_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFile" ADD CONSTRAINT "TrainingFile_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "PersonalTraining"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
