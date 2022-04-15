/*
 * @Author: your name
 * @Date: 2022-04-16 04:46:22
 * @LastEditTime: 2022-04-16 05:57:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /bus-box-rent/src/weixin/weixin.controller.ts
 */
import { Get, Controller } from '@nestjs/common';
import { WeixinService } from './weixin.service';

@Controller('weixin')
export class WeixinController {
  constructor(private readonly weixinService: WeixinService) {}

  @Get('login')
  async loginWithCode(code: string) {
    return await this.weixinService.loginWithCode(code);
  }
}
