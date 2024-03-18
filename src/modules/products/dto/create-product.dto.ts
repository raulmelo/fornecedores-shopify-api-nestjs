import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: 'Título do produto', default: 'brasil local' })
  @IsString()
  @Length(8, 120)
  title: string;
  
  @ApiProperty({ description: 'Texto do contéudo', default: 'brasil local' })
  @IsString()
  body_html: string;

  @ApiProperty({ description: 'Nome do fornecedor', default: 'brasil local' })
  @IsString()
  vendor: string;
}

export class ShopifyUpdateProduct {
  @ApiProperty({ description: 'Título do produto', default: 'brasil local' })
  @IsString()
  @Length(8, 120)
  title: string;
  
  @ApiProperty({ description: 'Texto do contéudo', default: 'brasil local' })
  @IsString()
  body_html: string;

  @ApiProperty({ description: 'Nome do fornecedor', default: 'brasil local' })
  @IsString()
  vendor: string;

  @ApiProperty({ description: 'Tipo do produto', default: 'brasil local' })
  @IsString()
  product_type: string;

  @ApiProperty({ description: 'Tags do produto', default: 'brasil local' })
  @IsString()
  tags: string;

  @ApiProperty({ description: 'Publicado', default: true })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ description: 'Variações e preço', default: 123456 })
  @IsString()
  variants: ShopifyUpdateProductVariants[];

  @ApiProperty({ description: 'Metafields', default: 'brasil local' })
  metafields: any
}

export interface ShopifyUpdateProductVariants {
  [key: string]: any;
}

export class UpdateVariantQtd {
  @ApiProperty({ description: 'Id da variante', default:  123456 })
  @IsString()
  inventory_item_id: number;

  @ApiProperty({ description: 'total de itens', default: 12 })
  @IsString()
  available_adjustment: string;

}