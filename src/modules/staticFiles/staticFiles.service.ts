import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticFilesService {
  getFiles(): string {
    return '获取所有文件';
  }
}
