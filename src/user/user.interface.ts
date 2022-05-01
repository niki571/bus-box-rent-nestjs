/*
 * @Author: wuqianying
 * @Date: 2022-04-15 15:16:13
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 16:01:36
 */
import { Request } from 'express';

export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
}
export interface Code2SessionRO {
  openid: string;
  session_key: string;
  errcode: number;
  errmsg: string;
}
export interface UserRO {
  user: UserData;
}

export interface GetUserAuthInfoRequest extends Request {
  user: UserData;
}
