import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.usersService.findOne({ email: dto.email });

    if (user?.password !== dto.password) {
      throw new UnauthorizedException('Username or password not valid');
    }

    const payload = { sub: user.id, email: user.email };
  
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
