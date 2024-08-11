/*
  Warnings:

  - You are about to drop the column `secret` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[otp]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_secret_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "secret",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_otp_key" ON "user"("otp");
