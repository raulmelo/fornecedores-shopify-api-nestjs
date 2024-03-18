
import { PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './create-business.dto';
import { Prisma } from '@prisma/client';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
  id?: number | string;
  cnpj?: string;
  idShopify?: string | number;
  title?: string;
  body_html?: string;
  imageUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  users?: Prisma.UserCreateNestedManyWithoutBusinessesInput;
}

export class idUserDto {
  id: string;
}