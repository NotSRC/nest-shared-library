import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { DmTestingService } from './dm-testing.service';

export interface DmTestModuleOptions {
  mongoUser: string;
  mongoPass: string;
  mongoCluster: string;
}

export interface DmTestModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<DmTestModuleOptions> | DmTestModuleOptions;
  inject?: any[];
}

@Module({
  providers: [DmTestingService],
})
export class DmTestingModule {
  static forRootAsync(options: DmTestModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: DmTestingModule,
      providers: [
        DmTestingService,
        {
          provide: 'DmTestModuleOptions',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [DmTestingService],
      imports: [...(options.imports || [])],
    };
  }
}
