import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get,
    Res,
    Type,
    UseFilters,
    Body
  } from '@nestjs/common';
  import {
    ApiQuery,
    ApiBody,
    ApiParam,
    ApiTags,
    ApiBearerAuth,
    ApiResponse,
    ApiHeader,
    ApiConsumes,
    ApiAcceptedResponse,
    ApiBodyOptions,
    ApiBadRequestResponse,
    ApiParamOptions
    
  } from "@nestjs/swagger";
  import { Express } from 'express';
  import { ConfigModule, ConfigService } from 'nestjs-config';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UpfilesService } from './upfiles.service';
  import { HttpExceptionFilter } from 'src/filters/http/http-exception.filter';
  @ApiTags("文件上传接口")
  @UseFilters( new HttpExceptionFilter())
  @Controller('api/upfiles')
  export class UpfilesController {
    constructor(private readonly upfilesService: UpfilesService,private readonly _config:ConfigService) {}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    // @ApiParam()
    @ApiConsumes("multipart/form-data")
    // @ApiHeader({content:{ data: "multipart/form-data"}})
    // @ApiBody({description: "上传文件",type:"form" })
    @ApiParam({name:"file",type:'file'})
    @ApiParam({name:"name",type: "string"})
    upload(@Body() body,@UploadedFile() file:Express.Multer.File) {
        // console.log(body)
        let fileUrl =  file.path.split('uploads')[1];
        fileUrl = this._config.get("baseconfig").baseAPI+':'+this._config.get("baseconfig").basePort+'/static'+fileUrl.replace(/\\/g, '/');
      return  this.upfilesService.create(file,body,fileUrl);
    }
     @Get()
     getAll(){
      return this.upfilesService.findAll();
     }
    
    // @Get('export')
    // async downloadAll(@Res() res: Response) {
    //   const { filename, tarStream } = await this.upfilesService.downloadAll();
    //   res.setHeader('Content-Type', 'application/octet-stream');
    //   res.setHeader(
    //     'Content-Disposition',
    //     `attachment; filename=${filename}`,
    //   );
    //   tarStream.pipe(res);
    // }
  }
  