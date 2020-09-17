import {DynamicModule, Module} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {NOTIFICATION_SERVICE_NAME} from './notification.constants';
import {EmailNotificationService} from './email-notification/email-notification.service';

@Module({
  providers: [NotificationService, EmailNotificationService],
  exports: [NotificationService, EmailNotificationService],
})
export class NotificationModule {
  static forRoot(host: string, port: number): DynamicModule {
    return {
      module: NotificationModule,
      imports: [
        ClientsModule.register([
          {
            name: NOTIFICATION_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: host,
              port: port,
            },
          }
        ])
      ]
    };
  }
}
