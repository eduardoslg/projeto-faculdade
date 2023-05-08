-- CreateTable
CREATE TABLE "pessoa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "anoNasc" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);
