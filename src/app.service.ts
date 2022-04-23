/*
 * @Author: wuqianying
 * @Date: 2022-03-31 12:42:42
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-04-23 17:22:26
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
