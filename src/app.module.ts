import { Module, MiddlewareConsumer,RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { resolve } from 'path';
import { AppService } from './app.service';
import { StaticFilesModule } from './modules/staticFiles/staticFiles.module'
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { StatusMonitorModule } from 'nest-status-monitor'; //监控包
import statusMonitorConfig from './config/statusMonitor'; //监控配置
import { MailerModule } from '@nest-modules/mailer';// 邮件服务
import { AuthModule } from './modules/auth/auth.module'; //鉴权
import { TypeOrmModule } from '@nestjs/typeorm'; //SQL
import { UsersModule } from './modules/users/users.module';//user
import { ScheduleModule } from '@nestjs/schedule';//定时依赖
import { TasksModule } from './modules/tasks/tasks.module'; //定时任务
import { AudioModule } from './jobs/audio/audio.module'; //任务队列
// import { UpfilesModule } from './modules/upfiles/upfiles.module'; //上传文件
@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // MailerModule.forRootAsync({
    //   useFactory: (config: ConfigService) => config.get('email'),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    StaticFilesModule,
    AuthModule,
    UsersModule,
    // ScheduleModule.forRoot(),
    // TasksModule,
    AudioModule,
    // UpfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){ //生产中间件（相当于工厂）
     consumer
     .apply(LoggerMiddleware) //应用中间件
     .exclude({path:'static',method:RequestMethod.GET}) //
     .forRoutes("static")  //监听static 路径
  }
}
