import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ReturnDefault } from 'src/tools/return-default';



@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER'])
  async create(@Body() createBusinessDto: CreateBusinessDto): Promise<any> {
    const register = await this.businessService.create(createBusinessDto);
    return register;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  async findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['FORNECEDOR'])
  async findUser(@Param('id') id: string) {
    return this.businessService.findUser(Number(+id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(+id, updateBusinessDto);
  }

  @Patch('adduser/:id/:idUser')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  async addUser(@Param('id') id: string, @Param('idUser') idUser: string) {
    const register = await this.businessService.businessAddUser(
      Number(id),
      Number(idUser),
    );
    return register;
  }

  @Delete('removeuser/:id/:idUser')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  async removeUserBusiness(
    @Param('id') id: string,
    @Param('idUser') idUser: string,
  ) {
    const register = await this.businessService.businessRemoveUser(
      Number(id),
      Number(idUser),
    );

    if (!register) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return ReturnDefault(null, 'Usuário removido com sucesso', 200);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }

  @Patch('enabled/:id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER', 'ADMIN'])
  async enabled(@Param('id') id: string) {
    const register = await this.businessService.enabled(Number(id));

    if (!register) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return ReturnDefault(null, 'Empresa ativada com sucesso', 200);
  }
}
