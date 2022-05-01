/*
 * @Author: wuqianying
 * @Date: 2022-04-02 23:55:04
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 20:56:00
 */
import {
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from './user.service';
import { APP_ID, APP_SECRET } from '../config';
import { WXLoginDto, CreateUserDto } from './dto';
import { Code2SessionRO } from './user.interface';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import WXCrypto from '../shared/utils/wxCrypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('phone')
  async getPhone(@Body() wxLoginDto: WXLoginDto) {
    const { code, iv, encryptedData } = wxLoginDto;
    const { openid, session_key } = await this.userService.getSessionKey(code);
    const pc = new WXCrypto(APP_ID, session_key);
    const data = pc.decryptData(encryptedData, iv);
    console.log('解密后 data: ', data);
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
