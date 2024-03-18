import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express';
import { RegisterUserDto } from "./dto/register-user.dto";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SendEmailService } from "../sendmail/sendmail.service";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./auth.guard";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jtwService: JwtService,
    private readonly sendEmailService: SendEmailService,
  ) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'ok',
        result,
      });
    } catch (error) {
      const message =
        error.message === 'User not found'
          ? 'Usuário não encontrado'
          : error.message;
      return response.status(500).json({
        status: 'error',
        message: message,
      });
    }
  }

  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
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

  @Post('reset-password')
  async requestPasswordReset(
    @Body('email') email: string,
    @Res() response: Response,
  ) {
    const data = await this.usersService.createPasswordResetToken(email);

    if (data.token) {
      this.sendEmailService.resetPassword(email, data.token, data.name);
    }

    if (!data.token) {
      return response.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    return response.status(200).json({
      status: 'ok',
      message: 'email enviado com sucesso',
    });
  }

  @Patch('reset-password/:token')
  async resetPasswordToken(
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const token = request.params.token;

    if (password !== confirmPassword) {
      return response.status(400).json({
        status: 'error',
        message: 'Senhas não conferem',
      });
    }

    const data = await this.usersService.resetPassword(token, password);

    if (!data) {
      return response.status(404).json({
        status: 'error',
        message: 'Token inválido ou expirado',
      });
    }

    return response.status(200).json({
      status: 'ok',
      message: 'Senha alterada com sucesso',
    });
  }

  // User info
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  async getUserInfo(@Req() request: Request, @Res() response: Response) {
    const HasAuthorization = request.headers.authorization;

    if (!HasAuthorization || HasAuthorization === 'null') {
      return response.status(401).json({
        status: 'error',
        message: 'Token inválido',
      });
    }
    
    const token = HasAuthorization.split(' ')[1];

    const dataToken = await this.jtwService.decode(token);

    dataToken.iat = undefined;
    dataToken.exp = undefined;

    return response.status(200).json({
      status: 'ok',
      user: dataToken,
    });
  }
}