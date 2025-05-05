/*
  Warnings:

  - You are about to drop the column `email` on the `team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "team_email_key";

-- AlterTable
ALTER TABLE "team" DROP COLUMN "email";
