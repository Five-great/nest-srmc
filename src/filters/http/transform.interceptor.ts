import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
  } from '@nestjs/common';
  import { map } from 'rxjs/operators';
  import { Observable } from 'rxjs';
  interface Response<T> {
    results: T;
  }
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler<T>,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((results)=> {
          return {
            results,
            statusCode: 200,
            resTime: this.formatDate(new Date()),
            message: '请求成功',
          };
        }),
      );
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