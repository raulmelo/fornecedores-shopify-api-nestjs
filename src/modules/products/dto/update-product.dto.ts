import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}


export class UpdateProductImagesDto {
  attachment: string;
  filename: string;
}