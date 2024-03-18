import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  Req, ForbiddenException, BadRequestException, Put, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ShopifyUpdateProduct, UpdateVariantQtd } from './dto/create-product.dto';
import { UpdateProductImagesDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../authentication/auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UsersService } from '../users/users.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(  
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'FORNECEDOR', 'ADMIN'])
  async findAll(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const token = request.headers['authorization'].split(' ')[1];

    if(!token) {
      throw new ForbiddenException('Você não tem permissão para acessar essa loja'); 
    }
    
    const userHasBusiness = await this.userService.userHasBusiness(token, Number(id));
    
    if(!userHasBusiness) {
      throw new ForbiddenException('Você não tem permissão para acessar essa loja');
    }

    try {
      const idShopify = userHasBusiness.businesses[0]?.idShopify;
      const queryProducts = await this.productsService.findAll(Number(idShopify));
      return {
        businesses: userHasBusiness.businesses[0],
        products: queryProducts.products
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao buscar os produtos');
    }

  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'FORNECEDOR', 'ADMIN'])
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ShopifyUpdateProduct) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  /// Atualizar informações extra do produto

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'FORNECEDOR', 'ADMIN'])
  @Patch(':id/images')
  updateImageProducts(@Param('id') id: string, @Body() updateProductDto: UpdateProductImagesDto) {
    return this.productsService.updateImageProducts(Number(id), updateProductDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'FORNECEDOR', 'ADMIN'])
  @Delete(':productId/images/:imageId')
  removeImageProducts(@Param('productId') productId: string, @Param('imageId') imageId: string) {
    return this.productsService.removeImageProducts(Number(productId), Number(imageId));
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'FORNECEDOR', 'ADMIN'])
  @Post('product-variant-qtd')
  updateProductVariantQtd(@Body() variantProduct: UpdateVariantQtd) {
    return this.productsService.updateProductVariantQtd(variantProduct);
  }









  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
