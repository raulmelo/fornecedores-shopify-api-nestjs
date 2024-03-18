import { Injectable } from '@nestjs/common';
import { TitleToSlug } from 'src/tools/slug-url';
import SaveBase64AsFile from 'src/tools/saveBase64asFile';
import { ShopifyService } from 'src/shopify/shopify.service';


@Injectable()
export class UtilsService {

  constructor(
    private readonly shopifyService: ShopifyService,
  ) { }

  async fileUploadBase64(filename: string, attachment: string) {
    const slugTitle = TitleToSlug(filename);
    const fileImage = await SaveBase64AsFile(attachment, slugTitle);

    const registerCollection = await this.shopifyService.uploadFileShopify(fileImage.base64, fileImage.filename);
    return registerCollection;


  }
}
