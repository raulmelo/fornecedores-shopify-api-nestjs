import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ShopifyService } from 'src/shopify/shopify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BusinessController],
  providers: [JwtService, BusinessService, PrismaService, ShopifyService],
})
export class BusinessModule {}
