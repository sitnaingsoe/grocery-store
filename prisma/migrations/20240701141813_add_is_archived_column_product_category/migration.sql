/*
  Warnings:

  - Added the required column `isArchived` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "isArchived" BOOLEAN NOT NULL;
