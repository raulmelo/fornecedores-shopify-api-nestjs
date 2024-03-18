import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from "@nestjs/common";
import { templateResetPassword } from "./templates/reset-password";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendEmailService {

     constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService,
    ) { }

    async resetPassword(email: string, token: string, name: string) {
        const urlFront = this.configService.get<string>('URL_FRONTEND') || 'http://localhost:3000'
        const templateEmail = templateResetPassword(name, token, urlFront);

        return new Promise( async (resolve, reject) => {
            await this.mailerService
              .sendMail({
                to: email,
                from: `MYPROJECTbot <${this.configService.get<string>('mailerConfig.user')}>`,
                subject: 'Recuperação de senha - MYPROJECT',
                html: templateEmail,
              })
              .then((resp) => {
                resolve(resp);
              })
              .catch((error) => {
                reject(error);
              });
        });

    }
}