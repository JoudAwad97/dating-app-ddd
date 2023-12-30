/*
  Warnings:

  - You are about to drop the column `profileId` on the `Like` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InteractionStatus" AS ENUM ('SENT', 'RECIPROCATED');

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "profileId",
ADD COLUMN     "status" "InteractionStatus" NOT NULL DEFAULT 'SENT';
