// @packages
import { Response, Request, NextFunction } from 'express';
import boom, { Boom, Payload, badImplementation } from '@hapi/boom';
// @scripts
import config from '@/config';

function withErrorStack(error: Payload, stack: string | undefined) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err: Error, _req: Request, _res: Response, next: NextFunction) {
  if (config.dev) {
    console.log(`[❌ ${err.name}]:`, err.message);
    console.log('[🔎]:', err?.stack);
  }
  next(err);
}

function wrapErrors(err: Error, _req: Request, _res: Response, next: NextFunction) {
  if (!boom.isBoom(err)) {
    next(badImplementation(err));
  }
  next(err);
}

function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  const {
    output: { statusCode, payload },
  } = err as Boom;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

export { logErrors, wrapErrors, errorHandler };
