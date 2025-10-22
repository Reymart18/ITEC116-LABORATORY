import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userPartial: Partial<User>) {
    const user = this.usersRepository.create(userPartial);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByVerificationToken(token: string) {
    return this.usersRepository.findOne({ where: { verificationToken: token } });
  }

  async verifyUser(user: User) {
    user.isVerified = true;
    user.verificationToken = null;
    return this.usersRepository.save(user);
  }

  async findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
