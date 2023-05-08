-- CreateTable
CREATE TABLE "tecnico" (
    "id" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "anosExperiencia" INTEGER NOT NULL,
    "tempoContrato" INTEGER NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jogador" (
    "id" TEXT NOT NULL,
    "nomeCamisa" TEXT NOT NULL,
    "posicaoJoga" TEXT NOT NULL,
    "numGolCarreira" INTEGER NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "jogador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tecnico" ADD CONSTRAINT "tecnico_personId_fkey" FOREIGN KEY ("personId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogador" ADD CONSTRAINT "jogador_personId_fkey" FOREIGN KEY ("personId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
