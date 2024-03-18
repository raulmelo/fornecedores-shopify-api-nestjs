import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.modules";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SendEmailService } from "../sendmail/sendmail.service";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    UsersService,
    SendEmailService,
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class AuthModule {}
