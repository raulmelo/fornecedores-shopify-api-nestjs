import { Controller, Delete, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request , Response } from 'express';
import { JwtAuthGuard } from "../authentication/auth.guard";
import { ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";

@ApiTags('users')
@Controller('users')
export class usersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @Roles(['MASTER'])
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.getAllUsers();
      return response.status(200).json({
        status: 'ok',
        result,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'Id do usuário a ser deletado.',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @Roles(['MASTER'])
  async deleteUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const { id } = request.params;
      const result = await this.usersService.deleteUser(Number(id));
      return response.status(200).json({
        status: 'ok',
        result,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}