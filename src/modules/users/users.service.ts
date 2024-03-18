import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";
import { JwtService } from '@nestjs/jwt';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { addHours } from 'date-fns';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jtwService: JwtService,
  ) {}

  
  async getAllUsers(): Promise<Users[]> {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new NotFoundException('Usuários não encontrados.');
    }

    const usersWithoutPassword = users.map((user) => {
      const getUser = user;
      delete getUser.password;
      delete getUser.createdAt;
      delete getUser.updatedAt;
      return getUser;
    })

    return usersWithoutPassword
  }


  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({data});
  }

  async createPasswordResetToken(email: string): Promise<{
    token: string;
    expiration: Date;
    name: string;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const token = randomBytes(20).toString('hex');
    const expiration = addHours(new Date(), 1); // Token expira em 1 hora

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expiration,
      },
    });

    return {
      token,
      expiration,
      name: user.name,
    };
  }

  async deleteUser(id: number): Promise<Users> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async userHasBusiness(token: string, idBusiness: number): Promise<null | any> {
    const dataToken = this.jtwService.decode(token);
    if (!dataToken) {
      return null
    }

    if(dataToken['role'] === 'MASTER' || dataToken['role'] === 'ADMIN') {
      const business = await this.prisma.business.findUnique({
        where: { id: idBusiness }
      });

      if (!business) {
        return null
      }

      const data = {
        businesses: [business]
      }

      return data;

    }

    if(dataToken['role'] === 'FORNECEDOR') {
      const user = await this.prisma.user.findUnique({
        where: { id: dataToken['id'] },
        select: {
          businesses: {
            where: {
              id: idBusiness,
            },
          },
        }
      });

      if (!user) {
        return null
      }

      if (user.businesses.length === 0) {
        return null
      }

      return user;

    }

    
  }


  // async getAllProviders(): Promise<Users[]> {
  //   const users = this.prisma.user.findMany();



  // }

  // Método para alterar a senha do usuário
  async resetPassword(token: string, newPassword: string): Promise<boolean> {

    const passwordResetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!passwordResetToken || new Date() > passwordResetToken.expiresAt) {
      throw new NotFoundException('Token inválido ou expirado.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    });
    return true;
  }
}