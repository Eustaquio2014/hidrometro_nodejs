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
