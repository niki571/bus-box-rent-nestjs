import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

import { JWT_SECRET, APP_ID, APP_SECRET, GRANT_TYPE } from '../config';
import { WXLoginRO, UserRO } from './user.interface';
import { WXLoginDto, CreateUserDto, LoginUserDto } from './dto';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async wxlogin(code: WXLoginDto) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=${GRANT_TYPE}`;
    let res: WXLoginRO;
    this.httpService
      .get(url)
      .pipe(map((axiosResponse) => axiosResponse.data))
      .subscribe((data) => {
        res = data;
      });
    if (!res.openid || !res.session_key || res.errcode) {
      throw new HttpException({ message: res.errmsg }, HttpStatus.UNAUTHORIZED);
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

  // async create(dto: CreateUserDto): Promise<UserRO> {
  //   // check uniqueness of username/email
  //   const { username, email, password } = dto;
  //   const qb = await getRepository(User)
  //     .createQueryBuilder('user')
  //     .where('user.username = :username', { username })
  //     .orWhere('user.email = :email', { email });

  //   const user = await qb.getOne();

  //   if (user) {
  //     const errors = { username: 'Username and email must be unique.' };
  //     throw new HttpException(
  //       { message: 'Input data validation failed', errors },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // create new user
  //   const newUser = new User();
  //   newUser.username = username;
  //   newUser.email = email;
  //   newUser.password = password;
  //   newUser.articles = [];

  //   const errors = await validate(newUser);
  //   if (errors.length > 0) {
  //     const _errors = { username: 'Userinput is not valid.' };
  //     throw new HttpException(
  //       { message: 'Input data validation failed', _errors },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   } else {
  //     const savedUser = await this.userRepository.save(newUser);
  //     return this.buildUserRO(savedUser);
  //   }
  // }

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
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      JWT_SECRET,
    );
  }

  // private buildUserRO(user: User) {
  //   const userRO = {
  //     id: user.id,
  //     username: user.username,
  //     email: user.email,
  //     bio: user.bio,
  //     token: this.generateJWT(user),
  //     image: user.image,
  //   };

  //   return { user: userRO };
  // }
}
