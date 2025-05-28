/*
  Warnings:

  - Added the required column `patronymic` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "patronymic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "patronymic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "patronymic" TEXT NOT NULL;
