// @packages
import { Response, Request, NextFunction } from 'express';
import boom from '@hapi/boom';

interface UserWithScopes extends Express.User {
  scopes?: string[];
}

interface RequestWithScopes extends Request {
  user?: UserWithScopes;
}

function scopesValidationHandler(allowedScopes: string[]) {
  return (req: RequestWithScopes, _res: Response, next: NextFunction) => {
    if (!req.user || (req.user && !req.user?.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }
    const hasAccess = allowedScopes
      .map((allowedScope) => req.user?.scopes?.includes(allowedScope))
      .find((allowed) => Boolean(allowed));

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scopes'));
    }
  };
}

export default scopesValidationHandler;
