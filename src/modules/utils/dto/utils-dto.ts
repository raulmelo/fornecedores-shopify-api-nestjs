import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class FileUploadBase64 {
  @ApiProperty({ description: 'Nome do arquivo', default: 'barsil-alosa' })
  @IsString()
  @Length(8, 40)
  filename: string;
  
  
  @ApiProperty({ description: 'base64'})
  @IsString()
  @Length(8, 40)
  attachment: string
}
// { filename: string, attachment: string  }