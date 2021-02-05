import { NestFactory } from '@nestjs/core';
import { DocumentBuilder ,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http/http-exception.filter';
import { TransformInterceptor } from './filters/http/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as serveStatic from 'serve-static';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true});
  // 使用跨站脚本攻击类的库
  // app.use(helmet());
  app.setGlobalPrefix('v1.1');
  // 全局使用中间件
  // app.use(Logger)
  //全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.use('/static', serveStatic(join(__dirname, '/uploads')));
  app.use('/public', serveStatic(join(__dirname, '/public')));
  const swaggerOptions = new DocumentBuilder()
  .setTitle('静态资源管理中心')
  .setDescription('管理图片，文件静态资源')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app ,swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'),{
    prefix: '/admin/',   //设置虚拟路径
 }); 

  app.setBaseViewsDir(join(__dirname, '..', 'views')) // 放视图的文件
  app.setViewEngine('ejs');
const _PORT = process.env.PORT || 3000;
// const SECRET = process.env.SECRET || 'true';
  await app.listen(_PORT,()=>{
    console.log("API接口地址：http://127.0.0.1:" + _PORT);
    console.log("API文档地址：http://127.0.0.1:" + _PORT + "/doc");
  });
}
bootstrap();
