import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  FinancialRequestDto,
  FinancialSchema,
} from "../validators/financialSchema";

export const makeFinancial = async (data: FinancialRequestDto) => {
  const validate = FinancialSchema.safeParse(data);
  if (validate.success) {
    // The data contains personId
    const { personId } = data;
    // Check if the person exists
    const personExists = await prisma.financial.findUnique({
      where: { id: personId },
    });
    if (!personExists) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Person for this bank not found. "
      );
    }

    // All checks passed, proceed to create the bank
    return await prisma.financial.create({
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
export const getFinancials = async () => {
  //get all banks and the associated persons
  const financial = await prisma.financial.findMany({
    include: {
      person: true,
    },
  });

  return financial;
};
export const getFinancialtById = async (id: string) => {
  //get a bank by id and populate
  const financial = await prisma.financial.findUnique({
    where: {
      id,
    },
    include: {
      person: true,
    },
  });
  return financial;
};

export const updateFinancial = async (
  id: string,
  data: FinancialRequestDto
) => {
  const validate = FinancialSchema.parse(data);
  const financial = await prisma.financial.update({
    where: {
      id: id,
    },
    data: {
      type: validate.type,
      amount: validate.amount,
      personId: validate.personId,
    },
  });
  return financial;
};

export const deleteFinancial = async (id: string) => {
  const financial = await prisma.financial.delete({
    where: {
      id,
    },
  });
  return financial;
};
