import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { SignUpDto } from './dto';
import { CurrentUser } from './decorators';
import { User } from 'entities';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(user);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return { accessToken, refreshToken };
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const { refreshToken, accessToken } =
      await this.authService.refreshToken(user);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      domain: this.configService.get('UI_DOMAIN'),
    });

    return { accessToken, refreshToken };
  }
}
