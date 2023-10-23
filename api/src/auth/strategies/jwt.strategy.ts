import { PassportStrategy } from '@nestjs/passport';
import { cookieExtractor } from 'auth/lib/helpers/cookie-extractor';
import { Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
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
