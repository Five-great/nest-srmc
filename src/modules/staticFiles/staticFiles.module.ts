import { Module } from '@nestjs/common';
import { StaticFilesController } from './staticFiles.controller';
import { StaticFilesService } from './staticFiles.service';
import { UpfilesModule } from '../upfiles/upfiles.module'; //上传文件

@Module({
  imports: [UpfilesModule],
  controllers: [StaticFilesController],
  providers: [StaticFilesService],
})
export class StaticFilesModule {}
