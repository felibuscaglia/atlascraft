import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(dto: SignInDto) {
    const user = await this.usersService.findOne({ email: dto.email });

    if (user?.password !== dto.password) {
      throw new UnauthorizedException('Username or password not valid');
    }

    const { password, ...result } = user;

    return result;
  }
}
