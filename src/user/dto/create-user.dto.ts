/*
 * @Author: wuqianying
 * @Date: 2022-04-15 01:01:19
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 23:30:45
 */
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly openid: string;

  @IsNotEmpty()
  readonly phonenumber: string;
}
