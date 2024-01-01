/*
  Warnings:

  - You are about to drop the column `memberIds` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `_ChatToProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChatMemberRole" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "_ChatToProfile" DROP CONSTRAINT "_ChatToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToProfile" DROP CONSTRAINT "_ChatToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "memberIds";

-- DropTable
DROP TABLE "_ChatToProfile";

-- CreateTable
CREATE TABLE "ChatMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "role" "ChatMemberRole" NOT NULL,

    CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
