import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";


export class LoginDto {
    @ApiProperty({ description: 'Email do usuário', default: 'raulmelo.web@gmail.com' })
    @IsString()
    @Length(4, 20)
    email: string;

    @ApiProperty({ description: 'Senha do usuário', default: '12345678' })
    @IsString()
    @Length(8, 20)
    password: string;   
}