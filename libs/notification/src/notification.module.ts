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

  static async registerAsync(asyncOptions: NotificationModuleAsyncOptions): Promise<DynamicModule> {
    const asyncProviders = await this.createAsyncProviders(asyncOptions);

    const optionsProvider = {
      provide: 'NotificationModuleOptions',
      inject: ['NotificationModuleOptions'],
      useFactory: async (options: NotificationModuleOptions) => {
        console.log(options);
        return options;
      }
    };

    return {
      global: true,
      module: NotificationModule,
      providers: [NotificationService, EmailNotificationService, ...asyncProviders, optionsProvider],
      exports: [NotificationService, EmailNotificationService],
      imports: [
        ...asyncOptions.imports,
        ClientsModule.registerAsync([
          {
            imports: asyncOptions.imports,
            name: NOTIFICATION_SERVICE_NAME,
            inject: ['NotificationModuleOptions'],
            useFactory: (options: NotificationModuleOptions) => ({
              transport: Transport.TCP,
              options: {
                host: options.host,
                port: options.port,
              },
            })
          }
        ])
      ],
    };
  }

  private static createAsyncProviders(options: NotificationModuleAsyncOptions): Provider[] {
    return [this.createAsyncOptionsProvider(options)]
  }

  private static createAsyncOptionsProvider(options: NotificationModuleAsyncOptions): Provider {
    return {
      provide: 'NotificationModuleOptions',
      useFactory: options.useFactory,
      inject: options.inject || [],
    }
  }

}
