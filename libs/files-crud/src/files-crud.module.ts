import { Module } from '@nestjs/common';
import { FileProvider } from './shemas/file.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesCrudService } from './files-crud.service';

@Module({
  controllers: [],
  providers: [FilesCrudService],
  exports: [FilesCrudService],
  imports: [MongooseModule.forFeatureAsync([FileProvider]),]
})
export class FilesCrudModule {
}
