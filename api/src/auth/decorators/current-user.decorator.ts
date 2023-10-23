import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'entities';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request & { user: { email: string; user: User } } = ctx
      .switchToHttp()
      .getRequest();
    
    return data && request.user ? request.user[data] : request.user;
  },
);
