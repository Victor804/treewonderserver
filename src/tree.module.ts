import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';

@Module({
  imports: [HttpModule],
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
