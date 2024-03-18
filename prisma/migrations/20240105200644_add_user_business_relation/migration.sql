-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BusinessToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_cnpj_key" ON "Business"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessToUser_AB_unique" ON "_BusinessToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessToUser_B_index" ON "_BusinessToUser"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
