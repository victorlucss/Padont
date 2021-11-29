import { Module } from '@nestjs/common';
import { PadsController } from './pads.controller';
import { PadsService } from './pads.service';

@Module({
  controllers: [PadsController],
  providers: [PadsService],
})
export class PadsModule {}
