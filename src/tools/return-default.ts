import { NotFoundException } from "@nestjs/common";



export enum StatusReturn {
    success = 200,
    created = 201,
    badRequest = 400,
    unauthorized = 401,
    notFound = 404,
    serverError = 500
}

export const ReturnDefault = (data: any, message: string, status: StatusReturn) => {


  if (status === StatusReturn.serverError) {
    throw new Error(message);
  }

  if(status === StatusReturn.notFound) {
    throw new NotFoundException(message);
  }

  return {
    status: status,
    message: message,
    data: data,
  };
};