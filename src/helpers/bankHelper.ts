import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { BankRequestDto, BankSchema } from "../validators/bankSchema";

export const makeBank = async (data: BankRequestDto) => {
  const validate = BankSchema.safeParse(data);
  if (validate.success) {
    // The data contains personId
    const { personId } = data;
    // Check if the person exists
    const personExists = await prisma.user.findUnique({ where: { id: personId } });
    if (!personExists) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Person for this bank not found. "
      );
    }

    
 
    // All checks passed, proceed to create the bank
    return await prisma.bank.create({
      data:{
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
export const getBanks = async () => {
  //get all banks and the associated persons
  const banks = await prisma.bank.findMany({
    include: {
      person: true,
      
    },
  });

  return banks;
};
export const getBankById = async (id: string) => {
  //get a bank by id and populate 
  const bank = await prisma.bank.findUnique({
    where: {
      id,
    },
    include: {
      person: true,
       
    },
  });
  return bank;
};

export const updateBank = async (id: string, data: BankRequestDto) => {
  const validate = BankSchema.parse(data);
  const bank = await prisma.bank.update({
    where: {
      id: id,
    },
    data: {
      accountNumber: validate.accountNumber,
      accountName: validate.accountName,
      bankName: validate.bankName,
      branchName: validate.branchName,
      type: validate.type,
      balance: validate.balance,
      personId: validate.personId,
    
    },
  });
  return bank;
};

export const deleteBank = async (id: string) => {
  const bank = await prisma.bank.delete({
    where: {
      id,
    },
  });
  return bank;
};
