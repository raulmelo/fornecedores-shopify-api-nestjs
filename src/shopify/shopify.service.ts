import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { ShopifySmartCollectionTypes } from './shopify.types';
import { UpdateProductImagesDto } from 'src/modules/products/dto/update-product.dto';
import { CreateProductDto, UpdateVariantQtd } from 'src/modules/products/dto/create-product.dto';

@Injectable()
export class ShopifyService {
  private readonly shopifyStoreName = 'MYPROJECT-1210';
  private readonly apiKey = 'MINHA_API_KEY_IMPORTANTE_NAO_ESQUECER';
  private readonly apiPassword = 'MINHA_API_PASSWORD_IMPORTANTE_NAO_ESQUECER';

  constructor(private httpService: HttpService) {}

  private getAuthHeader(): string {
    return (
      'Basic ' +
      Buffer.from(`${this.apiKey}:${this.apiPassword}`).toString('base64')
    );
  }

  async fetchProducts(): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createCustomCollection(
    smart_collection: ShopifySmartCollectionTypes,
  ): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/smart_collections.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: { smart_collection }
    };
    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      return error;
    }
  }



  async createNewProduct(product: CreateProductDto): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: {
        product
      }
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      debugger
      throw error;
    }
  }
  async getProducts(idCollection: number): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products.json?collection_id=${idCollection}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, product: any): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'put',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products/${id}.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: { product }
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      throw error
    }
  }


  async uploadFileShopify(base64EncodedFile: string, fileName: string): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2022-04/files.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: {
        file: {
          attachment: base64EncodedFile,
          filename: fileName,
        }
      },
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateImageProducts(id: number, image: UpdateProductImagesDto): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products/${id}/images.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: {
        product_id: id,
        position: 1,
        image
      },
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      throw error
    }
  }


  async deleteImageProduct(productId: number, imageId: number): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/products/${productId}/images/${imageId}.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    };

    return await this.httpService.axiosRef(config);
  }

  async updateProductVariantQtd(variant: UpdateVariantQtd): Promise<any> {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `https://${this.shopifyStoreName}.myshopify.com/admin/api/2024-01/inventory_levels/adjust.json`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
      data: {
        location_id: '87423648052',
        inventory_item_id: variant.inventory_item_id,
        available_adjustment: variant.available_adjustment
      }
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      new BadRequestException('Ocorreu um erro ao atualizar a quantidade do produto');
    }
  }
}