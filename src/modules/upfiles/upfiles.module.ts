import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { UpfilesController } from './upfiles.controller';
import { UpfilesService } from './upfiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpfilesEntity } from './upfiles.entity';


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UpfilesEntity]),
  ],
  controllers: [UpfilesController],
  providers: [UpfilesService],
  exports: [UpfilesService] 
})
export class UpfilesModule {}