import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { validate } from 'class-validator';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { APP_ID, APP_SECRET, GRANT_TYPE, JWT_SECRET } from '../config';
import { WXLoginDto, CreateUserDto, LoginUserDto } from './dto';
import { Code2SessionRO, UserRO } from './user.interface';
import User from './user.entity';
import ormconfig from '../../ormconfig.json';

const MyDataSource = new DataSource(ormconfig);
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async getSessionKey(code: string): Promise<Code2SessionRO> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=${GRANT_TYPE}`;
    const res: Code2SessionRO = await lastValueFrom(
      this.httpService.get(url).pipe(
        map((axiosRes) => {
          console.log(axiosRes.data);
          return axiosRes.data;
        }),
      ),
    );

    if (!res || res?.errmsg) {
      throw new HttpException(
        { message: res?.errmsg || '无法获取session_key' },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      console.log('成功');
      return res;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // async findOne({ email, password }: LoginUserDto): Promise<User> {
  //   const user = await this.userRepository.findOneBy({ email });
  //   if (!user) {
  //     return null;
  //   }

  //   if (await argon2.verify(user.password, password)) {
  //     return user;
  //   }

  //   return null;
  // }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { openid, phonenumber } = dto;
    const qb = await MyDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.openid = :openid', { openid })
      .orWhere('user.phonenumber = :phonenumber', { phonenumber });

    const user = await qb.getOne();

    if (!user) {
      // create new user
      const newUser = new User();
      newUser.openid = openid;
      newUser.phonenumber = phonenumber;

      const errors = await validate(newUser);
      if (errors.length > 0) {
        const _errors = { phonenumber: '请输入正确的用户手机号.' };
        throw new HttpException(
          { message: 'Input data validation failed', _errors },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser);
      }
    }
  }

  // async delete(email: string): Promise<DeleteResult> {
  //   return await this.userRepository.delete({ email });
  // }

  // async findById(id: number): Promise<UserRO> {
  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) {
  //     const errors = { User: ' not found' };
  //     throw new HttpException({ errors }, 401);
  //   }

  //   return this.buildUserRO(user);
  // }

  // async findByEmail(email: string): Promise<UserRO> {
  //   const user = await this.userRepository.findOneBy({ email });
  //   return this.buildUserRO(user);
  // }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        phonenumber: user.phonenumber,
        exp: exp.getTime() / 1000,
      },
      JWT_SECRET,
    );
  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      phonenumber: user.phonenumber,
      token: this.generateJWT(user),
    };

    return { user: userRO };
  }
}
