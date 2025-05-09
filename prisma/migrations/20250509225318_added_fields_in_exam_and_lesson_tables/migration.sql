-- CreateIndex
CREATE INDEX "Exam_lessonId_idx" ON "Exam"("lessonId");

-- CreateIndex
CREATE INDEX "Lesson_teacherId_idx" ON "Lesson"("teacherId");

-- CreateIndex
CREATE INDEX "Lesson_coachId_idx" ON "Lesson"("coachId");

-- CreateIndex
CREATE INDEX "Lesson_classId_idx" ON "Lesson"("classId");
