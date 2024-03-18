import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, ShopifyUpdateProductVariants, UpdateVariantQtd } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductImagesDto } from './dto/update-product.dto';
import { ShopifyService } from 'src/shopify/shopify.service';
import saveBase64AsFile from 'src/tools/saveBase64asFile';

@Injectable()
export class ProductsService {

  constructor(
    private readonly shopifyService: ShopifyService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const products = await this.shopifyService.createNewProduct(createProductDto);

    if(products.error || products.errors) {
      throw new BadRequestException('Ocorreu um erro ao criar o produto');
    }

    if(!products) { 
      throw new BadRequestException('Ocorreu um erro ao criar o produto');
    }


    return products;
  }

  async findAll(idShopify: number) {
    const products = await this.shopifyService.getProducts(idShopify);
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const request = await this.shopifyService.updateProduct(id, updateProductDto);


    if(request.error || request.errors) {
      throw new BadRequestException('Ocorreu um erro ao atualizar o produto');
    }


    if(!!request.product) {
      return request.product;
    }

    return request;
    
  }

  async updateImageProducts(id: number, updateProductImagesDto: UpdateProductImagesDto) {

    const imageBase = await saveBase64AsFile(updateProductImagesDto.attachment, updateProductImagesDto.filename)

    if(!imageBase) {
      throw new BadRequestException('Ocorreu um erro ao atualizar o produto');
    }

    const image = {
      attachment: imageBase.base64,
      filename: imageBase.filename
    }


    const request = await this.shopifyService.updateImageProducts(id, image);
    if(request.error || request.errors) {
      throw new BadRequestException('Ocorreu um erro ao atualizar o produto');
    }

    if(!!request.product) {
      return request.product;
    }

    return request;

  }

  async removeImageProducts(productId: number, imageId: number) {
    const response = await this.shopifyService.deleteImageProduct(productId, imageId);

    if(response.error || response.errors) {
      throw new BadRequestException('Ocorreu um erro ao deletar a imagem');
    }

    return response;
  }


  async updateProductVariantQtd(variant: UpdateVariantQtd) {
    const response = await this.shopifyService.updateProductVariantQtd(variant);

    if(response.error || response.errors) {
      throw new BadRequestException('Ocorreu um erro ao deletar a imagem');
    }

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
