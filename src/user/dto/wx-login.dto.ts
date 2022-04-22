/*
 * @Author: wuqianying
 * @Date: 2022-04-23 00:56:35
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-04-23 00:57:37
 */
import { IsNotEmpty } from 'class-validator';

export class WXLoginDto {
  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  readonly iv: string;

  @IsNotEmpty()
  readonly encryptedData: string;
}
