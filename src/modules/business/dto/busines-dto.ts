import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BusinessTypes {
  @ApiProperty({ description: 'Nome da empresa', default: 'brasil local' })
  @IsString()
  @Length(8, 40)
  title: string;

  @ApiProperty({
    description: 'Descrição da empresa',
    default: 'empresa de tecnologia',
  })
  @IsString()
  @Length(8, 200)
  body_html: string;

  @ApiProperty({
    description: 'Url da imagem da empresa',
    default: 'https://www.google.com.br',
  })
  @IsString()
  @Length(8, 200)
  imageUrl: string;

  @ApiProperty({ description: 'CNPJ da empresa', default: '123456789' })
  @IsString()
  cnpj: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
