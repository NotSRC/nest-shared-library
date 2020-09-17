import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE_NAME } from '../notification.constants';
import { EmailNotificationModel } from './email-notification.model';
import { EMAIL_NOTIFICATION_EVENTS } from './email-notification.constants';

@Injectable()
export class EmailNotificationService {
  constructor(@Inject(NOTIFICATION_SERVICE_NAME) private client: ClientProxy) {}

  async send(data: EmailNotificationModel) {
    console.log(data);
    this.client.emit(EMAIL_NOTIFICATION_EVENTS.SEND, data);
  }
}
