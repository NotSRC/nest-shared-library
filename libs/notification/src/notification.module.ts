import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailNotificationService } from './email-notification/email-notification.service';

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
            name: 'NOTIFICATION_SERVICE',
            transport: Transport.TCP,
            options: {
              host: options.host,
              port: options.port,
            },
          },
        ]),
      ],
    };
  }

  static async registerAsync(asyncOptions: NotificationModuleAsyncOptions): Promise<DynamicModule> {
    const optionsProvider = {
      provide: 'NotificationModuleOptions',
      useFactory: asyncOptions.useFactory,
      inject: asyncOptions.inject || [],
    };

    return {
      global: true,
      module: NotificationModule,
      providers: [NotificationService, EmailNotificationService],
      exports: [NotificationService, EmailNotificationService],
      imports: [
        ...asyncOptions.imports || [],
        ClientsModule.registerAsync([
          {
            name: 'NOTIFICATION_SERVICE',
            extraProviders: [optionsProvider],
            inject: ['NotificationModuleOptions'],
            useFactory: (options: NotificationModuleOptions) => ({
              transport: Transport.TCP,
              options: {
                host: options.host,
                port: options.port,
              },
            }),
          },
        ]),
      ],
    };
  }

}
