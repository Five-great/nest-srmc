import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiQuery,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiHeader
} from "@nestjs/swagger";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  @ApiBody({description: '请填写登录信息'})

  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiHeader({name:"token"})
  getProfile(@Request() req) {
    return req.user;
  }
}
