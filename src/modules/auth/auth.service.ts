import { Injectable } from '@nestjs/common';
import { ILogin, Isignup, authResponse } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { ValidateService } from 'src/shared/services';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { Repository } from 'typeorm';
import * as Exception from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { minRoundPasswordLength } from 'src/shared/files/constant';

@Injectable()
export class AuthService {
  roundPasswordLength = minRoundPasswordLength;

  constructor(
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
    private validateService: ValidateService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(payload: Isignup) {
    if (payload.email) {
      const email = await this.validateService.IsUserExistByEmail(
        payload.email,
      );
      if (email) {
        throw new Exception.ConflictException(
          'This email is already registered',
        );
      }
    }
    if (payload.phone) {
      const phone = await this.validateService.IsUserExistByPhone(
        payload.phone,
      );
      if (phone) {
        throw new Exception.ConflictException(
          'This phone number is already registered',
        );
      }
    }

    payload.password = await bcrypt.hash(
      payload.password,
      minRoundPasswordLength,
    );

    const token = await this.createToken({
      email: payload.email,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
    });

    payload.token = token;

    const response = await this.userRepo.save(payload);

    const data: authResponse = {
      token: response.token,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      phone: response.phone,
    };

    return data;
  }

  async login(payload: ILogin) {
    const isUser = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!isUser) {
      throw new Exception.NotFoundException('This email is not registered.');
    }

    const isPassword = await bcrypt.compare(payload.password, isUser.password);

    if (!isPassword) {
      throw new Exception.BadRequestException(
        'User name or password is incorrect',
      );
    }

    const data: authResponse = {
      token: isUser.token,
      email: isUser.email,
      firstName: isUser.firstName,
      lastName: isUser.lastName,
      phone: isUser.phone,
    };

    return data;
  }

  async createToken(payload: any) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async isValidToken(userDetails: any) {
    const user = await this.userRepo.findOne({
      where: {
        email: userDetails.email,
      },
    });
    return user;
  }
}
