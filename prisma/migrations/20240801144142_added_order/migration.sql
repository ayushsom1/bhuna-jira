/*
  Warnings:

  - Added the required column `order` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `priority` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "order" INTEGER NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;
