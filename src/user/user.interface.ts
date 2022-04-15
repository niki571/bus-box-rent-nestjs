import { Request } from 'express';

export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
}

export interface GetUserAuthInfoRequest extends Request {
  user: UserData;
}
