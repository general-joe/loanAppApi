import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  CurrentDebtRequestDto,
  CurrentDebtSchema,
} from "../validators/currentDebtSchema";

export const makeCurrentDebt = async (data: CurrentDebtRequestDto) => {
  const validate = CurrentDebtSchema.safeParse(data);
  if (validate.success) {
    // The data contains personId
    const { personId } = data;
    // Check if the person exists
    const personExists = await prisma.currentDebt.findUnique({
      where: { id: personId },
    });
    if (!personExists) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Person for this bank not found. "
      );
    }

    // All checks passed, proceed to create the bank
    return await prisma.currentDebt.create({
      data: {
        ...data,
      },
    });
  } else if ("error" in validate) {
    const errors = validate.error.issues.map(
      ({ message, path }) => `${path}: ${message}`
    );

    throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
  }
};
//This to include person in the bank
export const getCurrentDebts = async () => {
  //get all banks and the associated persons
  const currentDebts = await prisma.currentDebt.findMany({
    include: {
      person: true,
    },
  });

  return currentDebts;
};
export const getCurrentDebtById = async (id: string) => {
  //get a bank by id and populate
  const currentDebt = await prisma.currentDebt.findUnique({
    where: {
      id,
    },
    include: {
      person: true,
    },
  });
  return currentDebt;
};

export const updateCurrentDebt = async (
  id: string,
  data: CurrentDebtRequestDto
) => {
  const validate = CurrentDebtSchema.parse(data);
  const currentDebt = await prisma.currentDebt.update({
    where: {
      id: id,
    },
    data: {
      loanAmount: validate.loanAmount,
      existingLoanType: validate.existingLoanType,
      outstandingBalance: validate.outstandingBalance,
      monthlyPaymentObligations: validate.monthlyPaymentObligations,
      personId: validate.personId,
    },
  });
  return currentDebt;
};

export const deleteCurrentDebt = async (id: string) => {
  const currentDebt = await prisma.currentDebt.delete({
    where: {
      id,
    },
  });
  return currentDebt;
};
