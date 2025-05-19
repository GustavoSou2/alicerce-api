import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { MailService } from 'src/modules/mail/service/mail.service';

@Controller("mail")
export class MailController {
  constructor(private mailService: MailService) {}

  @Public()
  @Post("pre-launch")
  preLaunchRegister(@Body() data: any) {
    return this.mailService.sendLaunchEmail(data);
  }

  @Public()
  @Post("contact")
  contact(@Body() data: any) {
    return this.mailService.sendContact(data);
  }
}
