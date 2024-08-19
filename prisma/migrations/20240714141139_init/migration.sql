/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "birthday" VARCHAR(10) DEFAULT '2000-01-01',
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstname" VARCHAR(50),
ADD COLUMN     "lastname" VARCHAR(50),
ADD COLUMN     "password" VARCHAR(255),
ADD COLUMN     "phone" VARCHAR(10),
ADD COLUMN     "profile" VARCHAR(50) DEFAULT 'profile.webp',
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "sex" BOOLEAN DEFAULT true,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(30);

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(12) NOT NULL DEFAULT 'user',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserve" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "content" VARCHAR(255),
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat_msg" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "state_chat" BOOLEAN NOT NULL,
    "read_user" BOOLEAN DEFAULT false,
    "read_dmt" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_msg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "location" VARCHAR(50),
    "price" INTEGER NOT NULL,
    "doc" VARCHAR(100),
    "state" BOOLEAN DEFAULT false,
    "facebook" VARCHAR(70),
    "line" VARCHAR(40),
    "phone" VARCHAR(10),
    "occupied" BOOLEAN DEFAULT false,
    "view" INTEGER DEFAULT 0,
    "reviewScore" DECIMAL(65,30) DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dormitory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_img" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "url" VARCHAR(50) NOT NULL,

    CONSTRAINT "Dormitory_img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_type" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" INTEGER DEFAULT 0,
    "quantity" INTEGER DEFAULT 0,
    "occupied" INTEGER DEFAULT 0,
    "width" INTEGER,
    "length" INTEGER,

    CONSTRAINT "Dormitory_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_typeimg" (
    "id" SERIAL NOT NULL,
    "dmt_typeId" INTEGER NOT NULL,
    "url" VARCHAR(50) NOT NULL,

    CONSTRAINT "Dormitory_typeimg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_state" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "park_car" BOOLEAN DEFAULT false,
    "park_motorcycle" BOOLEAN DEFAULT false,
    "lift" BOOLEAN DEFAULT false,
    "security_door" BOOLEAN DEFAULT false,
    "fingerprint" BOOLEAN DEFAULT false,
    "keycard" BOOLEAN DEFAULT false,
    "man" BOOLEAN DEFAULT false,
    "female" BOOLEAN DEFAULT false,
    "animal" BOOLEAN DEFAULT false,
    "fitness" BOOLEAN DEFAULT false,
    "wifi" BOOLEAN DEFAULT false,
    "cctv" BOOLEAN DEFAULT false,
    "security_guard" BOOLEAN DEFAULT false,
    "smoke" BOOLEAN DEFAULT false,
    "restaurant" BOOLEAN DEFAULT false,
    "store" BOOLEAN DEFAULT false,
    "washing" BOOLEAN DEFAULT false,

    CONSTRAINT "Dormitory_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_facilitate" (
    "id" SERIAL NOT NULL,
    "dmt_typeId" INTEGER NOT NULL,
    "fan" BOOLEAN DEFAULT false,
    "air" BOOLEAN DEFAULT false,
    "closet" BOOLEAN DEFAULT false,
    "water_heater" BOOLEAN DEFAULT false,
    "table" BOOLEAN DEFAULT false,
    "dressing_table" BOOLEAN DEFAULT false,
    "fridge" BOOLEAN DEFAULT false,
    "bed" BOOLEAN DEFAULT false,
    "tv" BOOLEAN DEFAULT false,

    CONSTRAINT "Dormitory_facilitate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dormitory_state_dmtId_key" ON "Dormitory_state"("dmtId");

-- CreateIndex
CREATE UNIQUE INDEX "Dormitory_facilitate_dmt_typeId_key" ON "Dormitory_facilitate"("dmt_typeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_msg" ADD CONSTRAINT "Chat_msg_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory" ADD CONSTRAINT "Dormitory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory_img" ADD CONSTRAINT "Dormitory_img_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory_type" ADD CONSTRAINT "Dormitory_type_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory_typeimg" ADD CONSTRAINT "Dormitory_typeimg_dmt_typeId_fkey" FOREIGN KEY ("dmt_typeId") REFERENCES "Dormitory_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory_state" ADD CONSTRAINT "Dormitory_state_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory_facilitate" ADD CONSTRAINT "Dormitory_facilitate_dmt_typeId_fkey" FOREIGN KEY ("dmt_typeId") REFERENCES "Dormitory_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
