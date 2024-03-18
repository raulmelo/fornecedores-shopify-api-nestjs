import { Module } from '@nestjs/common';
import { SendEmailService } from './sendmail.service';



@Module({
  controllers: [],
  providers: [SendEmailService],
})
export class SendEmailModule {}
