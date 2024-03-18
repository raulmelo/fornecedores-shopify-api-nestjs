import { Controller } from "@nestjs/common";
import { SendEmailService } from "./sendmail.service";

@Controller('messenger')
export class sendmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  // @Get('/test')
  // async sendMail(
  //   @Req() request: Request,
  //   @Res() response: Response,
  // ): Promise<any> {
  //   try {
  //     const result = await this.sendEmailService.resetPassword(
  //       'raulmelo123@gmail.com',
  //       'codigo123',
  //       'João Melo',
  //     );
  //     return response.status(200).json({
  //       status: 'ok',
  //       result,
  //     });
  //   } catch (error) {
  //     return response.status(500).json({
  //       status: 'error',
  //       message: error.message,
  //     });
  //   }
  // }
}
