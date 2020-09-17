import {DynamicModule, Module, ModuleMetadata, Provider, Type} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {NOTIFICATION_SERVICE_NAME} from './notification.constants';
import {EmailNotificationService} from './email-notification/email-notification.service';

interface NotificationModuleOptions {
  host: string;
  port: number;
}

export interface NotificationModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<NotificationModuleOptions> | NotificationModuleOptions;
  inject?: any[];
}

@Module({})
export class NotificationModule {

  static register(options: NotificationModuleOptions): DynamicModule {
    return {
      global: true,
      module: NotificationModule,
      providers: [NotificationService, EmailNotificationService],
      exports: [NotificationService, EmailNotificationService],
      imports: [
        ClientsModule.register([
          {
            name: NOTIFICATION_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: options.host,
              port: options.port,
            },
          }
        ])
      ]
    };
  }

  static async forRootAsync(asyncOptions: NotificationModuleAsyncOptions): Promise<DynamicModule> {

    const options = await asyncOptions.useFactory(...asyncOptions.inject);
    return {
      global: true,
      module: NotificationModule,
      providers: [NotificationService, EmailNotificationService, ...asyncOptions.inject],
      exports: [NotificationService, EmailNotificationService],
      imports: [
        ...asyncOptions.imports,
        ClientsModule.register([
          {
            name: NOTIFICATION_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: options.host,
              port: options.port,
            },
          }
        ])
      ],
    };
  }

}
