import { PassportStrategy } from '@nestjs/passport';
import { cookieExtractor } from 'auth/lib/helpers/cookie-extractor';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => cookieExtractor(req, true),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      fullName: payload.fullName,
      id: payload.id,
      email: payload.email,
    };
  }
}
