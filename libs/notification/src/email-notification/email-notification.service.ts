import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailNotificationModel } from './email-notification.model';

@Injectable()
export class EmailNotificationService {
  constructor(@Inject('NOTIFICATION_SERVICE') private client: ClientProxy) {}

  send(data: EmailNotificationModel) {
    return this.client.send('send-email', data).toPromise();
  }
}
