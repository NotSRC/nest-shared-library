import {Module} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {NOTIFICATION_SERVICE_NAME} from './notification.constants';

@Module({
  providers: [NotificationService],
  exports: [NotificationService],
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4200,
        },
      }
    ])
  ]
})
export class NotificationModule {

}
