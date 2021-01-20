import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { DmLoggerInterceptor } from '../libs/logger/src';
import { EmailNotificationService, EmailTemplate } from '../libs';

@UseInterceptors(DmLoggerInterceptor)
@Controller()
export class AppController {
  constructor(private notificationService: EmailNotificationService) {}

  @Get()
  async getHello() {
    return this.notificationService.send({
      templateId: EmailTemplate.UserInvitation,
      language: 'en',
      to: 'dimatsourkan@gmail.com',
      subject: 'Test',
      templateData: {
        user_name: 'Dima',
        site_name: 'iBuilt',
        notification_link: '',
      },
    });
  }
}
