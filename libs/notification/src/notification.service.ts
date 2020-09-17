import { Injectable } from '@nestjs/common';
import {EmailNotificationService} from './email-notification/email-notification.service';

@Injectable()
export class NotificationService {
  constructor(public email: EmailNotificationService) {

  }
}


