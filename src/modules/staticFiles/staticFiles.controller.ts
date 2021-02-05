import { Controller, Get,Query,Post,Body,UseFilters ,HttpException,HttpStatus,UseGuards,Inject} from '@nestjs/common';
import {
  ApiQuery,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiHeader
} from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { StaticFilesService } from './StaticFiles.service';
import { HttpExceptionFilter } from 'src/filters/http/http-exception.filter';
import { UpfilesService} from '../upfiles/upfiles.service';
@UseFilters( new HttpExceptionFilter())
@ApiTags("文件api")
@Controller('/api')
export class StaticFilesController {
  constructor(private readonly staticFilesService: StaticFilesService,private readonly UpfilesService : UpfilesService) {}
  //查询所有
  @Get('')
  getFiles() {
    return this.UpfilesService.query({size:5,current:1})
  }
  //分类查询
  @Get('get')
  @ApiQuery({name:"className",required:false })
  @ApiResponse({
    status: 200,
    description: "get ..." 
  })
  fetch(@Query() query){
    // if(!query['className']){ 
    //    throw new HttpException({
    //       status: HttpStatus.BAD_REQUEST, message: '请求className 必传',error: 'className is required'
    //    },HttpStatus.BAD_REQUEST)
    // }

     return this.UpfilesService.query({size:5,current:1})
  }

  //创建
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBody({description: '请填写创建内容'})
  @ApiHeader({name: "token"})
  create(@Body() req): string{
     return req;
  }
}
