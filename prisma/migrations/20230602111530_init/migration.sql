/*
  Warnings:

  - Added the required column `conf_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentation_id` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "conf_id" INTEGER NOT NULL,
ADD COLUMN     "presentation_id" INTEGER NOT NULL,
ALTER COLUMN "time_for_speech" SET DEFAULT 5;

-- CreateTable
CREATE TABLE "Privelege" (
    "id" INTEGER NOT NULL,
    "is_organisator" BOOLEAN NOT NULL,
    "is_student" BOOLEAN NOT NULL,
    "is_technical_support" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Presentation" (
    "id" SERIAL NOT NULL,
    "storage_type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "datetime_start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Break" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 5,
    "schedule_pos" INTEGER NOT NULL,
    "conf_id" INTEGER NOT NULL,

    CONSTRAINT "Break_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Privelege_id_key" ON "Privelege"("id");

-- AddForeignKey
ALTER TABLE "Privelege" ADD CONSTRAINT "Privelege_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_presentation_id_fkey" FOREIGN KEY ("presentation_id") REFERENCES "Presentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_conf_id_fkey" FOREIGN KEY ("conf_id") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_conf_id_fkey" FOREIGN KEY ("conf_id") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
