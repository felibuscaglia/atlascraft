import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { SignUpDto } from './dto';
import { CurrentUser } from './decorators';
import { User } from 'entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@CurrentUser() user: User) {
    return await this.authService.login(user);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
