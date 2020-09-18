import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { DmLoggerService } from './logger.service';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { SentryModuleOptions } from '@ntegral/nestjs-sentry/lib/interfaces/sentry-options.interface';
import { DmLoggerInterceptor } from './logger.interceptor';

interface LoggerModuleOptions extends SentryModuleOptions {

}

export interface LoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
  inject?: any[];
}

@Module({})
export class LoggerModule {

  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [DmLoggerService, DmLoggerInterceptor],
      exports: [DmLoggerService, DmLoggerInterceptor],
      imports: [
        SentryModule.forRoot(options),
      ],
    };
  }

  static async registerAsync(asyncOptions: LoggerModuleAsyncOptions): Promise<DynamicModule> {
    const optionsProvider = {
      provide: 'LoggerModuleOptions',
      useFactory: asyncOptions.useFactory,
      inject: asyncOptions.inject || [],
    };

    return {
      global: true,
      module: LoggerModule,
      providers: [DmLoggerService, DmLoggerInterceptor, optionsProvider],
      exports: [DmLoggerService, DmLoggerInterceptor, optionsProvider],
      imports: [
        ...asyncOptions.imports || [],
        SentryModule.forRootAsync({
          inject: ['LoggerModuleOptions'],
          useFactory: (options: LoggerModuleOptions) => {
            console.log(options);
            return options;
          }
        })
      ],
    };
  }

}
