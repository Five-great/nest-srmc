/*
  HTTP 异常处理器  （过滤器）

**/ 
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException>{
    catch(exception:HttpException,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        console.log(exception)
        const exceptionRes: any = exception.getResponse();
        const {
            error ,
            message
         } = exceptionRes ;
         response.status(status).json({
             statusCode: status,
             resTime: this.formatDate(new Date()),
             path: request.url,
             error,
             message
         })
    }
    formatTen = (num :number) =>{ 
		return num > 9 ? (num + "") : ("0" + num); 
	  } 
    formatDate=(date :any) =>{ 
		var year = date.getFullYear(); 
		var month = date.getMonth() + 1; 
		var day = date.getDate(); 
		var hour = date.getHours(); 
		var minute = date.getMinutes(); 
		var second = date.getSeconds(); 
		return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+'T' + hour + ':' + minute + ':' + second; 
	}
}