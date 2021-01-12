import { Module } from '@nestjs/common';
import { DmTestingService } from './dm-testing.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule],
  providers: [DmTestingService],
})
export class DmTestingModule {}
