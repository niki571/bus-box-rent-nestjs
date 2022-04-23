/*
 * @Author: wuqianying
 * @Date: 2022-04-15 14:50:12
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-04-23 17:10:11
 */
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { GetUserAuthInfoRequest } from './user.interface';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: GetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);
      // const user = await this.userService.findById(decoded.id);

      // if (!user) {
      //   throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      // }

      // req.user = user.user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
