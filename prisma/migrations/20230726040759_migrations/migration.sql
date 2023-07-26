/*
  Warnings:

  - You are about to drop the column `name` on the `users_login` table. All the data in the column will be lost.
  - Added the required column `token` to the `users_login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users_login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users_login` DROP COLUMN `name`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
