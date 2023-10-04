import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { SignInDto, SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(dto: SignInDto) {
    const user = await this.usersService.findOne({ email: dto.email });

    if (user?.password !== dto.password) {
      throw new UnauthorizedException('Username or password not valid');
    }

    return await this.generateAccessToken(user.id, user.email);
  }

  public async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await hash(signUpDto.password, await genSalt(10));

    const userAlreadyExists = await this.usersService.findOne({ email: signUpDto.email });

    if (userAlreadyExists) {
      throw new ConflictException();
    }

    const newUser = await this.usersService.create(
      signUpDto.fullName,
      signUpDto.email,
      hashedPassword,
    );

    return await this.generateAccessToken(newUser.id, newUser.email);
  }

  private async generateAccessToken(userId: string, email: string) {
    const payload = { sub: userId, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
