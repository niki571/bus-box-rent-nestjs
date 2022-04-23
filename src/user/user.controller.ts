/*
 * @Author: wuqianying
 * @Date: 2022-04-02 23:55:04
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-04-23 17:07:28
 */
import {
  Get,
  Post,
  Body,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { WXLoginDto, CreateUserDto } from './dto';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/phone')
  async getPhone(params: WXLoginDto) {
    return await this.userService.wxlogin(params);
  }

  // @Get('user')
  // async findMe(@User('email') email: string): Promise<UserRO> {
  //   return await this.userService.findByEmail(email);
  // }

  // @UsePipes(new ValidationPipe())
  // @Post('users')
  // async create(@Body('user') userData: CreateUserDto) {
  //   return this.userService.create(userData);
  // }

  // @Delete('users/:slug')
  // async delete(@Param() params) {
  //   return await this.userService.delete(params.slug);
  // }

  // @UsePipes(new ValidationPipe())
  // @Post('users/login')
  // async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
  //   const _user = await this.userService.findOne(loginUserDto);

  //   const errors = { User: ' not found' };
  //   if (!_user) throw new HttpException({ errors }, 401);

  //   const token = await this.userService.generateJWT(_user);
  //   const { email, username, bio, image } = _user;
  //   const user = { email, token, username, bio, image };
  //   return { user };
  // }
}
