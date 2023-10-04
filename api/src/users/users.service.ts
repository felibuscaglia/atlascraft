import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public findOne(whereOptions: FindOptionsWhere<User>) {
    return this.usersRepository.findOne({
      where: whereOptions,
    });
  }

  public create(fullName: string, email: string, password: string) {
    const newUser = new User();

    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password;

    return this.usersRepository.save(newUser);
  }
}
