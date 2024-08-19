/*
  Warnings:

  - You are about to drop the column `state` on the `Dormitory` table. All the data in the column will be lost.
  - You are about to alter the column `reviewScore` on the `Dormitory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - Made the column `read_user` on table `Chat_msg` required. This step will fail if there are existing NULL values in that column.
  - Made the column `read_dmt` on table `Chat_msg` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Chat_msg` required. This step will fail if there are existing NULL values in that column.
  - Made the column `occupied` on table `Dormitory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `view` on table `Dormitory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewScore` on table `Dormitory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Dormitory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fan` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `air` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closet` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `water_heater` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dressing_table` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fridge` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bed` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tv` on table `Dormitory_facilitate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `park_car` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `park_motorcycle` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lift` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `security_door` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fingerprint` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keycard` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `man` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `female` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `animal` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fitness` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wifi` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cctv` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `security_guard` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smoke` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restaurant` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `store` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `washing` on table `Dormitory_state` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Dormitory_type` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `Dormitory_type` required. This step will fail if there are existing NULL values in that column.
  - Made the column `occupied` on table `Dormitory_type` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat_msg" ALTER COLUMN "read_user" SET NOT NULL,
ALTER COLUMN "read_dmt" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dormitory" DROP COLUMN "state",
ALTER COLUMN "occupied" SET NOT NULL,
ALTER COLUMN "view" SET NOT NULL,
ALTER COLUMN "reviewScore" SET NOT NULL,
ALTER COLUMN "reviewScore" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dormitory_facilitate" ALTER COLUMN "fan" SET NOT NULL,
ALTER COLUMN "air" SET NOT NULL,
ALTER COLUMN "closet" SET NOT NULL,
ALTER COLUMN "water_heater" SET NOT NULL,
ALTER COLUMN "table" SET NOT NULL,
ALTER COLUMN "dressing_table" SET NOT NULL,
ALTER COLUMN "fridge" SET NOT NULL,
ALTER COLUMN "bed" SET NOT NULL,
ALTER COLUMN "tv" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dormitory_img" ALTER COLUMN "url" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "Dormitory_state" ADD COLUMN     "home" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "park_car" SET NOT NULL,
ALTER COLUMN "park_motorcycle" SET NOT NULL,
ALTER COLUMN "lift" SET NOT NULL,
ALTER COLUMN "security_door" SET NOT NULL,
ALTER COLUMN "fingerprint" SET NOT NULL,
ALTER COLUMN "keycard" SET NOT NULL,
ALTER COLUMN "man" SET NOT NULL,
ALTER COLUMN "female" SET NOT NULL,
ALTER COLUMN "animal" SET NOT NULL,
ALTER COLUMN "fitness" SET NOT NULL,
ALTER COLUMN "wifi" SET NOT NULL,
ALTER COLUMN "cctv" SET NOT NULL,
ALTER COLUMN "security_guard" SET NOT NULL,
ALTER COLUMN "smoke" SET NOT NULL,
ALTER COLUMN "restaurant" SET NOT NULL,
ALTER COLUMN "store" SET NOT NULL,
ALTER COLUMN "washing" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dormitory_type" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "occupied" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile",
ALTER COLUMN "createdAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "Location_distance" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Location_distance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location_distance" ADD CONSTRAINT "Location_distance_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
