import { Module } from '@nestjs/common';
import { usersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    controllers: [usersController],
    providers: [UsersService, PrismaService, JwtService]
})

export class UsersModule {}