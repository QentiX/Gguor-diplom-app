/*
  Warnings:

  - Added the required column `day` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "day" INTEGER NOT NULL;
