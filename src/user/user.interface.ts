/*
 * @Author: wuqianying
 * @Date: 2022-04-15 15:16:13
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 21:02:54
 */
import { Request } from 'express';

export interface UserData {
  phonenumber: string;
  token: string;
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
