import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {
  ExpensesRequestDto,
  ExpensesSchema,
} from "../validators/expensesSchema";

export const makeExpenses = async (data: ExpensesRequestDto) => {
  const validate = ExpensesSchema.safeParse(data);
  if (validate.success) {
    const { personId } = data;

    const personExists = await prisma.person.findUnique({
      where: { id: personId },
    });
    if (!personExists) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Person for this bank not found. "
      );
    }

    return await prisma.expenses.create({
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

export const getExpenses = async () => {
  const expenses = await prisma.expenses.findMany({
    include: {
      person: true,
    },
  });

  return expenses;
};
export const getExpensestById = async (id: string) => {
  const expenses = await prisma.expenses.findUnique({
    where: {
      id,
    },
    include: {
      person: true,
    },
  });
  return expenses;
};

export const updateExpenses = async (id: string, data: ExpensesRequestDto) => {
  const validate = ExpensesSchema.parse(data);
  const expenses = await prisma.expenses.update({
    where: {
      id: id,
    },
    data: {
      type: validate.type,
      amount: validate.amount,

      personId: validate.personId,
    },
  });
  return expenses;
};

export const deleteExpenses = async (id: string) => {
  const expenses = await prisma.expenses.delete({
    where: {
      id,
    },
  });
  return expenses;
};
