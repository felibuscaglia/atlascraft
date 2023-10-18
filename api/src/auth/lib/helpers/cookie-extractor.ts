import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants/cookie-names';

export const cookieExtractor = (req: Request) => {
  return req && req.cookies ? req.cookies[ACCESS_TOKEN_COOKIE_NAME] : null;
};
