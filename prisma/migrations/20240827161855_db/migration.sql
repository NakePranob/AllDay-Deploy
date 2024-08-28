-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "profile" TEXT NOT NULL DEFAULT 'https://kowbzvvtazxyxyzbfils.supabase.co/storage/v1/object/public/profire/profile.webp',
    "birthday" VARCHAR(10) DEFAULT '2000-01-01',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" VARCHAR(50),
    "lastname" VARCHAR(50),
    "password" VARCHAR(255),
    "phone" INTEGER,
    "roleId" INTEGER NOT NULL DEFAULT 1,
    "sex" BOOLEAN DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Live_At" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,

    CONSTRAINT "Live_At_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(12) NOT NULL DEFAULT 'member',

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
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmt_typeId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "content" VARCHAR(255),
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "read_user" BOOLEAN NOT NULL DEFAULT false,
    "read_dmt" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_msg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "engname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" TEXT,
    "location" VARCHAR(50),
    "price" INTEGER NOT NULL,
    "doc" VARCHAR(100),
    "facebook" VARCHAR(70),
    "line" VARCHAR(40),
    "phone" INTEGER,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "view" INTEGER NOT NULL DEFAULT 0,
    "reviewScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dormitory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location_distance" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Location_distance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_img" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "url" VARCHAR(200) NOT NULL,

    CONSTRAINT "Dormitory_img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_type" (
    "id" SERIAL NOT NULL,
    "dmtId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "occupied" INTEGER NOT NULL DEFAULT 0,
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
    "park_car" BOOLEAN NOT NULL DEFAULT false,
    "park_motorcycle" BOOLEAN NOT NULL DEFAULT false,
    "lift" BOOLEAN NOT NULL DEFAULT false,
    "security_door" BOOLEAN NOT NULL DEFAULT false,
    "fingerprint" BOOLEAN NOT NULL DEFAULT false,
    "keycard" BOOLEAN NOT NULL DEFAULT false,
    "man" BOOLEAN NOT NULL DEFAULT false,
    "female" BOOLEAN NOT NULL DEFAULT false,
    "animal" BOOLEAN NOT NULL DEFAULT false,
    "fitness" BOOLEAN NOT NULL DEFAULT false,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "cctv" BOOLEAN NOT NULL DEFAULT false,
    "security_guard" BOOLEAN NOT NULL DEFAULT false,
    "smoke" BOOLEAN NOT NULL DEFAULT false,
    "restaurant" BOOLEAN NOT NULL DEFAULT false,
    "store" BOOLEAN NOT NULL DEFAULT false,
    "washing" BOOLEAN NOT NULL DEFAULT false,
    "home" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Dormitory_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dormitory_facilitate" (
    "id" SERIAL NOT NULL,
    "dmt_typeId" INTEGER NOT NULL,
    "fan" BOOLEAN NOT NULL DEFAULT false,
    "air" BOOLEAN NOT NULL DEFAULT false,
    "closet" BOOLEAN NOT NULL DEFAULT false,
    "water_heater" BOOLEAN NOT NULL DEFAULT false,
    "table" BOOLEAN NOT NULL DEFAULT false,
    "dressing_table" BOOLEAN NOT NULL DEFAULT false,
    "fridge" BOOLEAN NOT NULL DEFAULT false,
    "bed" BOOLEAN NOT NULL DEFAULT false,
    "tv" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Dormitory_facilitate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Live_At_userId_key" ON "Live_At"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_code_key" ON "Reserve"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_userId_key" ON "Reserve"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dormitory_state_dmtId_key" ON "Dormitory_state"("dmtId");

-- CreateIndex
CREATE UNIQUE INDEX "Dormitory_facilitate_dmt_typeId_key" ON "Dormitory_facilitate"("dmt_typeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Live_At" ADD CONSTRAINT "Live_At_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Live_At" ADD CONSTRAINT "Live_At_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_dmt_typeId_fkey" FOREIGN KEY ("dmt_typeId") REFERENCES "Dormitory_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_msg" ADD CONSTRAINT "Chat_msg_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dormitory" ADD CONSTRAINT "Dormitory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_distance" ADD CONSTRAINT "Location_distance_dmtId_fkey" FOREIGN KEY ("dmtId") REFERENCES "Dormitory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
