import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsString, Length } from "class-validator";

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @Length(4, 20)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(4, 20)
  email: string;

  @ApiProperty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty()
  @IsString()
  role: Role;

  @ApiProperty()
  @IsString()
  businessesId: string;
}