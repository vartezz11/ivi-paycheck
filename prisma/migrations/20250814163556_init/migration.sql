-- CreateEnum
CREATE TYPE "public"."Pay" AS ENUM ('TIP', 'SALARY', 'BONUS', 'NONE');

-- CreateTable
CREATE TABLE "public"."Paycheck" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "payType" "public"."Pay" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paycheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paycheck_date_key" ON "public"."Paycheck"("date");
