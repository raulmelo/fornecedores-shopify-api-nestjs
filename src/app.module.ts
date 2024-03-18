import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.modules';
import { AuthModule } from './modules/authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import mailerConfig from './config/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendEmailModule } from './modules/sendmail/sendmail.module';
import { BusinessModule } from './modules/business/business.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ProductsModule } from './modules/products/products.module';
import { UtilsModule } from './modules/utils/utils.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [mailerConfig],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
    UsersModule,
    SendEmailModule,
    AuthModule,
    BusinessModule,
    ProductsModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
