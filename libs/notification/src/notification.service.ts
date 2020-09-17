import { Injectable } from '@nestjs/common';
import {EmailNotificationService} from 'dm/notification/email-notification/email-notification.service';

@Injectable()
export class NotificationService {
  constructor(public email: EmailNotificationService) {

  }
}


