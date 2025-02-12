-- CreateTable
CREATE TABLE "Privilegio" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'Usuario',
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Privilegio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "local" TEXT,
    "macID" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hidrometro" (
    "id" SERIAL NOT NULL,
    "fluxo" TEXT NOT NULL,
    "deletado" BOOLEAN NOT NULL DEFAULT false,
    "dispositivoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hidrometro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValvulaSolenoide" (
    "id" SERIAL NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT false,
    "dispositivoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValvulaSolenoide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorPresenca" (
    "id" SERIAL NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT false,
    "dispositivoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorPresenca_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Privilegio_tipo_userId_key" ON "Privilegio"("tipo", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_macID_key" ON "Dispositivo"("macID");

-- CreateIndex
CREATE UNIQUE INDEX "ValvulaSolenoide_dispositivoId_key" ON "ValvulaSolenoide"("dispositivoId");

-- CreateIndex
CREATE UNIQUE INDEX "SensorPresenca_dispositivoId_key" ON "SensorPresenca"("dispositivoId");

-- AddForeignKey
ALTER TABLE "Privilegio" ADD CONSTRAINT "Privilegio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hidrometro" ADD CONSTRAINT "Hidrometro_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValvulaSolenoide" ADD CONSTRAINT "ValvulaSolenoide_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorPresenca" ADD CONSTRAINT "SensorPresenca_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macID") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `macID` on the `Dispositivo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Dispositivo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Privilegio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[macId]` on the table `Dispositivo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tipo,idUsuario]` on the table `Privilegio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Dispositivo" DROP CONSTRAINT "Dispositivo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hidrometro" DROP CONSTRAINT "Hidrometro_dispositivoId_fkey";

-- DropForeignKey
ALTER TABLE "Privilegio" DROP CONSTRAINT "Privilegio_userId_fkey";

-- DropForeignKey
ALTER TABLE "SensorPresenca" DROP CONSTRAINT "SensorPresenca_dispositivoId_fkey";

-- DropForeignKey
ALTER TABLE "ValvulaSolenoide" DROP CONSTRAINT "ValvulaSolenoide_dispositivoId_fkey";

-- DropIndex
DROP INDEX "Dispositivo_macID_key";

-- DropIndex
DROP INDEX "Privilegio_tipo_userId_key";

-- AlterTable
ALTER TABLE "Dispositivo" DROP COLUMN "macID",
DROP COLUMN "userId",
ADD COLUMN     "idUsuario" INTEGER,
ADD COLUMN     "macId" TEXT;

-- AlterTable
ALTER TABLE "Privilegio" DROP COLUMN "userId",
ADD COLUMN     "idUsuario" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_macId_key" ON "Dispositivo"("macId");

-- CreateIndex
CREATE UNIQUE INDEX "Privilegio_tipo_idUsuario_key" ON "Privilegio"("tipo", "idUsuario");

-- AddForeignKey
ALTER TABLE "Privilegio" ADD CONSTRAINT "Privilegio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hidrometro" ADD CONSTRAINT "Hidrometro_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValvulaSolenoide" ADD CONSTRAINT "ValvulaSolenoide_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorPresenca" ADD CONSTRAINT "SensorPresenca_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("macId") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO public."Usuario"(
	nome, sobrenome, email, senha, "createdAt", "updatedAt")
VALUES ('Victor','Almeida','victor.almeida@tucurui.ufpa.br','$2b$10$MuunqK68RcElGVpka5QeGOTn4eM8HXRh0rDwVwBX039r3P5uq3G/2','2023-01-17 01:09:40.49','2023-01-17 01:09:40.49');

INSERT INTO public."Dispositivo"(
	nome, local, "createdAt", "updatedAt", "idUsuario", "macId")
	VALUES('Hidrometro','Banheiro Masculino','2023-01-17 01:09:40.49','2023-01-17 01:09:40.49',1,'24:6F:28:16:B7:D8');

INSERT INTO public."Dispositivo"(
	nome, local, "createdAt", "updatedAt", "idUsuario", "macId")
	VALUES('Hidrometro 2','Banheiro Masculino','2023-01-17 01:09:40.49','2023-01-17 01:09:40.49',1,'40:22:D8:FF:81:E0');

