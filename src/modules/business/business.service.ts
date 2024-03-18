import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/prisma.service';
import { ShopifySmartCollectionTypes } from 'src/shopify/shopify.types';
import { ShopifyService } from 'src/shopify/shopify.service';
import { TitleToSlug } from 'src/tools/slug-url';
import SaveBase64AsFile from 'src/tools/saveBase64asFile';

@Injectable()
export class BusinessService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly shopifyService: ShopifyService,
  ) {}

  async create(createBusinessDto: CreateBusinessDto) {
    const { cnpj } = createBusinessDto;

    const findCompany = await this.prisma.business.findUnique({
      where: {
        cnpj,
      },
    });

    if (findCompany) {
      throw new BadRequestException('Empresa já cadastrada');
    }
    const slugTitle = TitleToSlug(createBusinessDto.title);
    const fileImage = await SaveBase64AsFile(createBusinessDto.imageUrl,slugTitle);

    if(!fileImage) {
      throw new BadRequestException('Erro ao salvar imagem');
    }


    const collectionShopify: ShopifySmartCollectionTypes = {
      title: createBusinessDto.title,
      body_html: createBusinessDto.body_html,
      handle: slugTitle,
      image: {
        attachment: fileImage.base64,
        alt: slugTitle,
      },
      rules: [
        {
          column: 'vendor',
          relation: 'equals',
          condition: createBusinessDto.title,
        },
      ],
    };

    const registerCollection = await this.shopifyService.createCustomCollection(collectionShopify);

    if (registerCollection.errors) {
      throw new BadRequestException(registerCollection.errors);
    }

    if (!registerCollection) {
      throw new BadRequestException('Erro ao cadastrar empresa');
    }

    const { id, image: { src } } = registerCollection.smart_collection;

    const creteNew = await this.prisma.business.create({
      data: {
        body_html: createBusinessDto.body_html,
        cnpj: createBusinessDto.cnpj,
        title: createBusinessDto.title,
        idShopify: String(id),
        imageUrl: src,
      },
    });

    return {
      status: 201,
      message: 'Empresa criada com sucesso',
      data: creteNew,
    };
  }

  async findAll() {
    return await this.prisma.business.findMany({
      select: {
        _count: { 
          select: {
            users: true,
          }
        },
        title: true,
        cnpj: true,
        idShopify: true,
        imageUrl: true,
        body_html: true,
        createdAt: true,
        id: true,
        disabled: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
          }
        }
      },
    });
  }

  findOne(id: number) {
    return this.prisma.business.findUnique({
      where: {
        id,
        disabled: false
      },
      select: {
        _count: {
          select: {
            users: true,
          }
        },
        title: true,
        cnpj: true,
        idShopify: true,
        imageUrl: true,
        body_html: true,
        createdAt: true,
        id: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
          }
        }
      },
    });
  }

  async findUser(id: number) {
    const business = await this.prisma.business.findMany({
      where: {
        users: {
          some: {
            id: id
          }
        }
      }
    });

    if(!business) {
      throw new BadRequestException('Empresa não encontrada');
    }



    return business;
  }

  businessAddUser(id: number, idUser: number) {
    return this.prisma.business.update({
      where: {
        id
      },
      data: {
        users: {
          connect: {
            id: idUser
          }
        }
      }
    });
  }

  async businessRemoveUser(id: number, idUser: number) {

    const findUsers = await this.prisma.business.findUnique({
      where: {
        id
      },
      select: {
        users: {
          where: {
            id: idUser
          }
        }
      }
    });

    if(!findUsers.users[0]) {
      return null
    }


    return this.prisma.business.update({
      where: {
        id
      },
      data: {
        users: {
          disconnect: {
            id: idUser
          }
        }
      }
    });
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    console.log(updateBusinessDto);
    return `This action updates a #${id} business`;
  }

  async enabled(id: number) {
    const findBusiness = await this.prisma.business.findUnique({
      where: {
        id
      }
    });

    if(!findBusiness) {
      return null;
    }

    // const enableBusiness = await this.shopifyService.enableCustomCollection(Number(findBusiness.idShopify));

    // if(enableBusiness.errors) {
    //   throw new BadRequestException(enableBusiness.errors);
    // }

    // if(!enableBusiness) {
    //   throw new BadRequestException('Erro ao habilitar empresa');
    // }

    return this.prisma.business.update({
      where: {
        id
      },
      data: {
        disabled: false
      }
     });
  }

  async remove(id: number) {
    const findBusiness = await this.prisma.business.findUnique({
      where: {
        id
      }
    });

    if(!findBusiness) {
      return null;
    }

    // const deleteBusiness = await this.shopifyService.deleteCustomCollection(Number(findBusiness.idShopify));

    // if(deleteBusiness.errors) {
    //   throw new BadRequestException(deleteBusiness.errors);
    // }

    // if(!deleteBusiness) {
    //   throw new BadRequestException('Erro ao deletar empresa');
    // }

    return this.prisma.business.update({
      where: {
        id
      },
      data: {
        disabled: true
      }
     });
  }
}
