/*
  Warnings:

  - Added the required column `status` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PictureStatus" AS ENUM ('PENDING_VALIDATION', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "status" "PictureStatus" NOT NULL;
