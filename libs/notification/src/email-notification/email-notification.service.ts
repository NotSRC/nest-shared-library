import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailNotificationModel } from './email-notification.model';

@Injectable()
export class EmailNotificationService {
  constructor(@Inject('NOTIFICATION_SERVICE') private client: ClientProxy) {
  }

  async send(data: EmailNotificationModel) {
    console.log(data);
    this.client.emit('send-email', data);
  }
}
