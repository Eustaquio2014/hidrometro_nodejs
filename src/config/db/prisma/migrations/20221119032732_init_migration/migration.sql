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
