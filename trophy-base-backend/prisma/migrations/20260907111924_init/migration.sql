-- CreateTable
CREATE TABLE "Trofeo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "juego" TEXT NOT NULL,
    "dificultad" TEXT NOT NULL,
    "requisito" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT false,
    "imagen" TEXT NOT NULL
);
