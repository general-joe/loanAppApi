/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "person_id_key" ON "person"("id");
