import { Request } from 'express';

export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
}
export interface WXLoginRO {
  openid: string;
  session_key: string;
  errcode: string;
  errmsg: string;
}
export interface UserRO {
  user: UserData;
}

export interface GetUserAuthInfoRequest extends Request {
  user: UserData;
}
