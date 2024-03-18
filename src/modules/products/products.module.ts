import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ShopifyService } from 'src/shopify/shopify.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [JwtService, ProductsService, PrismaService, ShopifyService, UsersService],
})
export class ProductsModule {}
