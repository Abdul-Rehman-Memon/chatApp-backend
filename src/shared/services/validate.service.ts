import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async IsUserExistByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async IsUserExistByPhone(phone: string) {
    return await this.userRepo.findOne({
      where: {
        phone: phone,
      },
    });
  }
}
