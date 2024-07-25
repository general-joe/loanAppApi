/*
  Warnings:

  - You are about to drop the column `del_flg` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "del_flg",
ADD COLUMN     "del_flag" BOOLEAN NOT NULL DEFAULT false;
