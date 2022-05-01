/*
 * @Author: wuqianying
 * @Date: 2022-04-02 23:54:46
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 14:57:25
 */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import User from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes(
    //     { path: 'user', method: RequestMethod.GET },
    //     { path: 'user', method: RequestMethod.PUT },
    //   );
  }
}
