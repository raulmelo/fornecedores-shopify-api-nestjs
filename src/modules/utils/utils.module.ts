import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { ShopifyService } from 'src/shopify/shopify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UtilsController],
  providers: [
    UtilsService, ShopifyService],
})
export class UtilsModule {}
