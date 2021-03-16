/*
  Warnings:

  - Added the required column `serviceProviderId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "serviceProviderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Staff" ADD FOREIGN KEY ("serviceProviderId") REFERENCES "ServiceProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
