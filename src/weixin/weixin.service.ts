/*
 * @Author: your name
 * @Date: 2022-04-16 04:46:34
 * @LastEditTime: 2022-04-16 06:00:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bus-box-rent/src/weixin/weixin.service.ts
 */
import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpService } from '@nestjs/axios';
import { APP_ID, APP_SECRET, GRANT_TYPE } from '../config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeixinService {
  constructor(private readonly httpService: HttpService) {}

  async loginWithCode(code: string) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=${GRANT_TYPE}`;
    const data: any = await firstValueFrom(this.httpService.get(url));
    if (!data.openid || !data.session_key || data.errcode) {
      throw new HttpException(
        { message: data.errmsg },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return data;
    }
  }
}
