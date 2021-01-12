import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { DmTestService } from './dm-test.service';

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
  providers: [DmTestService],
})
export class DmTestModule {
  static forRootAsync(options: DmTestModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: DmTestModule,
      providers: [
        DmTestService,
        {
          provide: 'DmTestModuleOptions',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [DmTestService],
      imports: [...(options.imports || [])],
    };
  }
}
