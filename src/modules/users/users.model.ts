import { Prisma, Role } from "@prisma/client";

export class Users implements Prisma.UserCreateInput {
    id?: number;
    email: string;
    password: string;
    cpf: string;
    name: string;
    role: Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;
}