import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { DmLoggerService } from './logger.service';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { SentryModuleOptions } from '@ntegral/nestjs-sentry/lib/interfaces/sentry-options.interface';

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
      providers: [DmLoggerService],
      exports: [DmLoggerService],
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
      providers: [DmLoggerService, optionsProvider],
      exports: [DmLoggerService, optionsProvider],
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
