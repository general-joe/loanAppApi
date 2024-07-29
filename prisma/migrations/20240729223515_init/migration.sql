-- CreateEnum
CREATE TYPE "documentType" AS ENUM ('PASSPORT', 'NATIONALID', 'DRIVERLICENSE', 'UTITLITYBILL', 'LEASEAGREEMENT', 'TAXRETURNS', 'BANKSTATMENT', 'CREDITREPORT', 'RECENTPAYSTUBS');

-- CreateEnum
CREATE TYPE "loanType" AS ENUM ('PERSONAL', 'AUTO', 'MORTGAGE', 'STUDENT', 'COOPERATE', 'BUSINESS');

-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('SAVINGS', 'CURRENT', 'COOPERATE', 'SUSU', 'FIXEDDEPOSIT', 'TBILL', 'BONDS');

-- CreateEnum
CREATE TYPE "expenseType" AS ENUM ('UTILITIES', 'GROCERIES', 'TRANSPORTATION', 'INSURANCES', 'OTHERS');

-- CreateEnum
CREATE TYPE "incomeType" AS ENUM ('WAGES', 'SALARY', 'BONUSES', 'OTHERS');

-- CreateEnum
CREATE TYPE "employmentType" AS ENUM ('FULLTIME', 'PARTTIME', 'CONTRACT', 'SELFEMPLOYED');

-- CreateEnum
CREATE TYPE "marital" AS ENUM ('SINGLE', 'MARRIED', 'WIDOWED', 'SEPARATED', 'DIVORCED');

-- CreateTable
CREATE TABLE "person" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "maritalStatus" "marital" NOT NULL,
    "noOfDependants" INTEGER NOT NULL,
    "previousHomeAddress" TEXT,
    "currentHomeAddress" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT NOT NULL,
    "previousPhone" TEXT,
    "nationalID" TEXT NOT NULL,
    "passportPictureUrl" TEXT NOT NULL,
    "passportPictureKey" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employment" (
    "id" TEXT NOT NULL,
    "currentEmployerName" TEXT NOT NULL,
    "currentEmployerAddress" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "employmentType" NOT NULL,
    "previousEmploymentDetails" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guarantor" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank" (
    "id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "type" "accountType" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "personId" TEXT,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial" (
    "id" TEXT NOT NULL,
    "type" "incomeType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "personId" TEXT,

    CONSTRAINT "financial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "type" "expenseType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "personId" TEXT,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currentDebt" (
    "id" TEXT NOT NULL,
    "loanAmount" DOUBLE PRECISION NOT NULL,
    "existingLoanType" "loanType" NOT NULL,
    "outstandingBalance" DOUBLE PRECISION NOT NULL,
    "monthlyPaymentObligations" DOUBLE PRECISION NOT NULL,
    "personId" TEXT,

    CONSTRAINT "currentDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditHistory" (
    "id" TEXT NOT NULL,
    "detailsOfPreviousLoans" TEXT NOT NULL,
    "repaymentHistory" TEXT NOT NULL,
    "latePayments" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "creditHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicRecords" (
    "id" TEXT NOT NULL,
    "bankruptcies" BOOLEAN NOT NULL,
    "criminalRecord" BOOLEAN NOT NULL,
    "nationality" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "publicRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" TEXT NOT NULL,
    "loanAmountRequested" DOUBLE PRECISION NOT NULL,
    "type" "loanType" NOT NULL,
    "purpose" TEXT NOT NULL,
    "loanTerm" INTEGER NOT NULL,
    "collateral" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "type" "documentType" NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "documentKey" TEXT NOT NULL,
    "personId" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employment" ADD CONSTRAINT "employment_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guarantor" ADD CONSTRAINT "guarantor_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank" ADD CONSTRAINT "bank_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial" ADD CONSTRAINT "financial_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currentDebt" ADD CONSTRAINT "currentDebt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditHistory" ADD CONSTRAINT "creditHistory_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicRecords" ADD CONSTRAINT "publicRecords_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
