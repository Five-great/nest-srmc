import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiQuery,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiHeader
} from "@nestjs/swagger";

@ApiTags("用户接口")

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //获取所有列表
  @Get()
  findAll() {
    // return this.usersService.findAll({ relations: ['photos'] }); //联合查询
    return this.usersService.findAll();
  }
  //创建用户
  @Post()
  @ApiBody({description:"创建用户"})
  async create(@Body() param) {
    const newParam = { ...param, status: true };
    await this.usersService.create(newParam);
    return true;
  }

  @Post('/many')
  async createMany(@Body() users) {
    const newUsers = users.map(user => ({ ...user, status: true }));
    await this.usersService.createMany(newUsers);
    return true
  }
}
