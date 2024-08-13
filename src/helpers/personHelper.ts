import HttpException from "../utils/http-error";
import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { PersonRequestDto, PersonSchema } from "../validators/personSchema";

export const makePerson = async (
  data: PersonRequestDto,
  picture: { passportPictureUrlUrl: string; passportPictureKey: string }
) => {
  const validate = PersonSchema.safeParse(data);
  if (validate.success) {
    const { nationalID } = data;

    const personExists = await prisma.person.findUnique({
      where: { id: nationalID },
    });
    if (personExists) {
      throw new HttpException(HttpStatus.BAD_REQUEST, "Person already exist. ");
    }

    return await prisma.person.create({
      data: {
        ...data,
        passportPictureUrl: picture.passportPictureUrlUrl,
        passportPictureKey: picture.passportPictureKey,
      },
    });
  } else if ("error" in validate) {
    const errors = validate.error.issues.map(
      ({ message, path }) => `${path}: ${message}`
    );

    throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
  }
};

export const getPersons = async () => {
  const persons = await prisma.person.findMany({
    include: {
      employments: true,
      guarantors: true,
      banks: true,
      financials: true,
      expenses: true,
      currentDebts: true,
      creditHistories: true,
      publicRecords: true,
      loans: true,
      documents: true,
    },
  });

  return persons;
};
export const getPersonById = async (id: string) => {
  const person = await prisma.person.findUnique({
    where: {
      id,
    },
    include: {
      employments: true,
      guarantors: true,
      banks: true,
      financials: true,
      expenses: true,
      currentDebts: true,
      creditHistories: true,
      publicRecords: true,
      loans: true,
      documents: true,
    },
  });
  return person;
};

export const updatePerson = async (id: string, data: PersonRequestDto) => {
  const validate = PersonSchema.parse(data);
  const person = await prisma.person.update({
    where: {
      id: id,
    },
    data: {
      fullname: validate.fullname,
      maritalStatus: validate.maritalStatus,
      noOfDependants: validate.noOfDependants,
      previousHomeAddress: validate.previousHomeAddress,
      currentHomeAddress: validate.currentHomeAddress,
      email: validate.email,
      telephone: validate.telephone,
      previousPhone: validate.previousPhone,
      nationalID: validate.nationalID,
      // passportPictureUrl: validate.passportPictureUrl,
      // passportPictureKey: validate.passportPictureKey,
    },
  });
  return person;
};

export const deletePerson = async (id: string) => {
  const person = await prisma.person.delete({
    where: {
      id,
    },
  });
  return person;
};
