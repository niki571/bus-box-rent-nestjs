import { Module } from '@nestjs/common';
import { WeixinController } from './weixin.controller';
import { WeixinService } from './weixin.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WeixinController],
  providers: [WeixinService],
})
export class WeixinModule {}
