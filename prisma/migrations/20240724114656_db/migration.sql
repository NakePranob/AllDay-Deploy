/*
  Warnings:

  - The `phone` column on the `Dormitory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phone` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Dormitory" ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile" TEXT NOT NULL DEFAULT 'https://kowbzvvtazxyxyzbfils.supabase.co/storage/v1/object/public/profire/profile.webp',
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER;
